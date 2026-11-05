import { Link } from 'react-router-dom'
import devBurgerLogo from '../assets/devburger-logo.png'

export default function AuthLayout({ children }) {
  return (
    <main className="auth-shell">
      <aside className="brand-side" aria-label="DevBurger">
        <img className="brand-logo-image" src={devBurgerLogo} alt="DevBurger" />
      </aside>
      <section className="form-side">
        <div className="auth-container">{children}</div>
      </section>
    </main>
  )
}

export function AuthFooter({ register }) {
  return (
    <p className="auth-footer">
      {register ? 'Já possui conta?' : 'Não possui conta?'}{' '}
      <Link to={register ? '/login' : '/register'}>Clique aqui.</Link>
    </p>
  )
}
