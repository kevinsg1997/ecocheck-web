import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { routes } from '../../routes'
import { cn } from '../../utils/cn'
import { Logo } from '../brand/Logo'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

const navItems = [
  { label: 'Como funciona', to: { pathname: routes.home, hash: '#como-funciona' } },
  { label: 'ODS', to: { pathname: routes.home, hash: '#ods' } },
  { label: 'Privacidade', to: { pathname: routes.privacy } },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isQuiz = location.pathname === routes.quiz
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to={routes.home} onClick={closeMenu} aria-label="EcoCheck, página inicial" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink',
                  isActive && !item.to.hash && 'text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!isQuiz && (
            <ButtonLink to={routes.quiz} size="md" className="hidden sm:inline-flex">
              Começar
            </ButtonLink>
          )}
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl text-ink-soft hover:bg-ink/5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Principal" className="border-t border-line/70 bg-canvas md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            {!isQuiz && (
              <ButtonLink to={routes.quiz} onClick={closeMenu} size="lg" fullWidth className="mt-2">
                Começar o EcoCheck
              </ButtonLink>
            )}
          </Container>
        </nav>
      )}
    </header>
  )
}
