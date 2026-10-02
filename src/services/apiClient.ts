import { env } from '../config/env'
import type { ProblemDetails } from '../types/api'

const DEFAULT_TIMEOUT_MS = 20_000

export type ApiErrorKind = 'config' | 'network' | 'timeout' | 'validation' | 'rate_limit' | 'server' | 'aborted'

/** Erro com mensagem já pronta para exibir ao usuário. */
export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number
  readonly fieldErrors: Record<string, string[]>

  constructor(kind: ApiErrorKind, message: string, status?: number, fieldErrors: Record<string, string[]> = {}) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST'
  body?: unknown
  signal?: AbortSignal
  timeoutMs?: number
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!env.apiUrl) {
    throw new ApiError('config', 'O serviço não está configurado no momento. Tente novamente mais tarde.')
  }

  const { method = 'GET', body, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = options

  const controller = new AbortController()
  let timedOut = false
  const timeout = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, timeoutMs)
  const abortFromCaller = () => controller.abort()
  signal?.addEventListener('abort', abortFromCaller, { once: true })

  let response: Response
  try {
    response = await fetch(`${env.apiUrl}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    })
  } catch {
    if (timedOut) {
      throw new ApiError('timeout', 'O servidor demorou para responder. Tente novamente em instantes.')
    }
    if (signal?.aborted) {
      throw new ApiError('aborted', 'Requisição cancelada.')
    }
    throw new ApiError('network', 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.')
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abortFromCaller)
  }

  if (response.ok) {
    return (await response.json()) as T
  }

  throw await toApiError(response)
}

async function toApiError(response: Response): Promise<ApiError> {
  const problem = await response.json().catch(() => null as ProblemDetails | null)
  const status = response.status

  if (status === 429) {
    return new ApiError('rate_limit', 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.', status)
  }

  if (status >= 400 && status < 500) {
    const fieldErrors = problem?.errors ?? {}
    const messages = Object.values(fieldErrors).flat()
    const message = messages[0] ?? problem?.title ?? 'Os dados enviados são inválidos.'
    return new ApiError('validation', message, status, fieldErrors)
  }

  return new ApiError('server', 'Ocorreu um erro no servidor. Tente novamente em instantes.', status)
}
