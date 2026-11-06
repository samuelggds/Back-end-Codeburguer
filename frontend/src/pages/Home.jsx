import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import devBurgerLogo from '../assets/devburger-logo.png'
import burgerImg from '../assets/home/hamburguer.svg'
import pancakeImg from '../assets/home/panquecas.svg'
import toastImg from '../assets/home/misto-quente.svg'
import './Home.css'

const categories = [
  { id: 'hamburgueres', title: 'Hambúrgueres', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=90' },
  { id: 'bebidas', title: 'Bebidas', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=90' },
  { id: 'sobremesas', title: 'Sobremesas', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=90' },
  { id: 'entradas', title: 'Entradas', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=90' },
]

const initialOffers = [
  { id: 'x-tudo', name: 'X-Tudo especial da casa', price: 35.90, category: 'hamburgueres', image: burgerImg },
  { id: 'waffles', name: 'Waffles', price: 20.90, category: 'sobremesas', image: pancakeImg },
  { id: 'panquecas', name: 'Panquecas', price: 15.90, category: 'sobremesas', image: pancakeImg },
  { id: 'misto', name: 'Misto-quente', price: 12.90, category: 'entradas', image: toastImg },
]

const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export default function Home() {
  const { user, logout } = useAuth()
  const categoryRef = useRef(null)
  const offerRef = useRef(null)
  const [category, setCategory] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [drawer, setDrawer] = useState(false)
  const [toast, setToast] = useState('')
  const offers = useMemo(() => category === 'all' ? initialOffers : initialOffers.filter((p) => p.category === category), [category])
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  function slide(ref, direction) {
    ref.current?.scrollBy({ left: direction * Math.max(200, ref.current.clientWidth * .64), behavior: 'smooth' })
  }

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      return existing
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }]
    })
    setToast(product.name + ' adicionado ao pedido')
    window.setTimeout(() => setToast(''), 2500)
  }

  function toggleFavorite(id) {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  }

  return (
    <div className="storefront">
      <header className="store-header">
        <div className="store-header-inner">
          <Link to="/" className="store-logo" aria-label="Página inicial"><img src={devBurgerLogo} alt="DevBurger" /></Link>
          <nav className="store-nav" aria-label="Navegação principal">
            <Link to="/">Home</Link><span aria-hidden="true" />
            <a href="#ofertas">Ofertas</a><span aria-hidden="true" />
            <a href="#contato">Contatos</a>
          </nav>
          <div className="store-account">
            <div className="store-user">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2c0-4 3-6 8-6s8 2 8 6v2"/></svg>
              <span><small>Olá, <b>{user?.name?.split(' ')[0] || 'Visitante'}</b></small>{user ? <button onClick={logout} type="button">Sair</button> : <Link to="/login">Entrar</Link>}</span>
            </div>
            <button type="button" className="store-orders" onClick={() => setDrawer(true)} aria-label={'Ver pedidos, ' + count + ' itens'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 3h16v18l-3-2-3 2-3-2-3 2-4-2z"/><path d="M8 8h8M8 12h8"/></svg>
              Pedidos {count > 0 && <span className="store-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="store-hero" aria-label="Banner de boas-vindas">
          <div className="store-hero-shade" />
          <div className="store-hero-content"><h1>Bem-vindo!</h1></div>
        </section>

        <div className="store-content">
          <section className="store-section store-categories" aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="store-title store-title-purple">Categorias</h2>
            <div className="store-carousel-wrap">
              <button type="button" className="store-arrow store-arrow-left" onClick={() => slide(categoryRef, -1)} aria-label="Categorias anteriores">‹</button>
              <div className="store-category-rail" ref={categoryRef}>
                {categories.map((item) => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory((value) => value === item.id ? 'all' : item.id); document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className={'store-category' + (category === item.id ? ' selected' : '')}>
                  <img src={item.image} alt="" loading="lazy" />
                  <span>{item.title}</span>
                </button>)}
              </div>
              <button type="button" className="store-arrow store-arrow-right" onClick={() => slide(categoryRef, 1)} aria-label="Próximas categorias">›</button>
            </div>
          </section>

          <section className="store-section store-offers" id="ofertas" aria-labelledby="offers-heading">
            <h2 id="offers-heading" className="store-title store-title-green">Ofertas do dia</h2>
            {category !== 'all' && <button type="button" className="store-clear-filter" onClick={() => setCategory('all')}>Mostrar todas as ofertas ×</button>}
            <div className="store-carousel-wrap">
              <button type="button" className="store-arrow store-arrow-left" onClick={() => slide(offerRef, -1)} aria-label="Ofertas anteriores">‹</button>
              <div className="store-offer-rail" ref={offerRef}>
                {offers.length ? offers.map((item) => <article className="store-product" key={item.id}>
                  <div className="store-product-photo"><img src={item.image} alt={item.name} loading="lazy" /></div>
                  <button type="button" className={'store-favorite' + (favorites.includes(item.id) ? ' is-favorite' : '')} onClick={() => toggleFavorite(item.id)} aria-label={favorites.includes(item.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} aria-pressed={favorites.includes(item.id)}>
                    {favorites.includes(item.id) ? '♥' : '♡'}
                  </button>
                  <div className="store-product-info"><h3>{item.name}</h3><p>{money(item.price)}</p></div>
                  <button type="button" className="store-add" onClick={() => addToCart(item)} aria-label={'Adicionar ' + item.name + ' ao pedido'}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 8h18l-2 12H5L3 8zM8 9V6a4 4 0 0 1 8 0v3M9 12v4M15 12v4"/></svg>
                  </button>
                </article>) : <p className="store-no-offers">Nenhuma oferta nesta categoria no momento.</p>}
              </div>
              <button type="button" className="store-arrow store-arrow-right" onClick={() => slide(offerRef, 1)} aria-label="Próximas ofertas">›</button>
            </div>
          </section>
        </div>
      </main>
      <footer className="store-footer" id="contato">Desenvolvido por DevClub - 2025 - Todos os direitos reservados</footer>
      {toast && <p className="store-toast" role="status">{toast}</p>}
      {drawer && <div className="store-modal-backdrop" onClick={() => setDrawer(false)}>
        <aside className="store-cart" role="dialog" aria-modal="true" aria-label="Seu pedido" onClick={(event) => event.stopPropagation()}>
          <div className="store-cart-header"><h2>Meu pedido</h2><button type="button" onClick={() => setDrawer(false)} aria-label="Fechar pedido">×</button></div>
          {cart.length === 0 ? <p>Você ainda não adicionou produtos.</p> : <>
            {cart.map((item) => <div className="store-cart-item" key={item.id}><img src={item.image} alt="" /><span>{item.name}<small>{item.quantity} × {money(item.price)}</small></span><button type="button" onClick={() => setCart((items) => items.map((product) => product.id === item.id ? { ...product, quantity: product.quantity - 1 } : product).filter((product) => product.quantity > 0))} aria-label={'Remover uma unidade de ' + item.name}>−</button></div>)}
            <div className="store-cart-total"><b>Total</b><b>{money(total)}</b></div>
            <p className="store-cart-notice">Demonstração visual: a finalização será conectada ao PostgreSQL e à API depois.</p>
          </>}
        </aside>
      </div>}
    </div>
  )
}
