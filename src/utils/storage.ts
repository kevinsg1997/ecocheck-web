/**
 * Acesso seguro ao Web Storage: em modo privado, com armazenamento bloqueado ou cheio,
 * as operações falham silenciosamente e o site continua funcionando.
 */
type StorageKind = 'session' | 'local'

function getStorage(kind: StorageKind): Storage | null {
  try {
    return kind === 'session' ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

export function readJson<T>(kind: StorageKind, key: string): T | null {
  try {
    const raw = getStorage(kind)?.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeJson(kind: StorageKind, key: string, value: unknown): void {
  try {
    getStorage(kind)?.setItem(key, JSON.stringify(value))
  } catch {
    // Sem armazenamento disponível: o progresso apenas não será mantido.
  }
}

export function removeItem(kind: StorageKind, key: string): void {
  try {
    getStorage(kind)?.removeItem(key)
  } catch {
    // Ignorado propositalmente.
  }
}
