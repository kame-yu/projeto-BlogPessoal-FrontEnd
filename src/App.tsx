import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Cadastro from './pages/cadastro/cadastro.tsx'
import Home from './pages/home/home.tsx'
import Login from './pages/login/Login.tsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen">

		<BrowserRouter>
      <Navbar />

      {/* 2. O 'main' é o container do seu conteúdo.
             - 'grow' faz ele crescer e ocupar o espaço vago.
             - 'flex flex-col' é ESSENCIAL para que o 'grow' do 'Home'funcione.
      */}

      <main className="grow flex flex-col">
				<Routes>
				<Route path="/cadastro" element={<Cadastro />} />
				<Route path="/home" element={<Home />} />
				<Route path="/" element={<Login />} />
				</Routes>
      </main>

      <Footer />
		</BrowserRouter>

    </div>
  )
}

export default App