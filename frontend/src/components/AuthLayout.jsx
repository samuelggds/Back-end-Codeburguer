import { Link } from 'react-router-dom'
export default function AuthLayout({ children }) {
  return <main className="auth-shell">
    <aside className="brand-side" aria-label="DevBurger"><div className="brand-logo"><span className="brand-top">dev</span><div className="brand-diamond"><span className="burger-icon">🍔</span></div><span className="brand-bottom">Burguer</span></div></aside>
    <section className="form-side"><div className="auth-container">{children}</div></section>
  </main>
}
export function AuthFooter({ register }) {
  return <p className="auth-footer">{register ? 'Já possui conta?' : 'Não possui conta?'}{' '}<Link to={register ? '/login' : '/cadastro'}>Clique aqui.</Link></p>
}
