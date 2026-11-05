import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './contexts/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function Home() {
  const { user, logout } = useAuth()
  return (
    <main className="home">
      <h1>Bem-vindo ao DevBurger, {user.name}!</h1>
      <p>Sua conta está autenticada com a API.</p>
      <button type="button" onClick={logout}>Sair da conta</button>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
