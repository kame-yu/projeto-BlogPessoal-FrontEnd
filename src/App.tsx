import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/home'

function App() {
  return (
    // 1. O 'div' principal deve ocupar 100% da altura (min-h-screen) e organizar tudo em coluna (flex flex-col)
    <div className="flex flex-col min-h-screen">

      <Navbar />

      {/* 2. O 'main' é o container do seu conteúdo.
             - 'grow' faz ele crescer e ocupar o espaço vago.
             - 'flex flex-col' é ESSENCIAL para que o 'grow' do 'Home'funcione.
      */}

      <main className="grow flex flex-col">
        <Home />
        {/* Após adicionar as rotas, o <Outlet /> fica aqui */}
      </main>

      <Footer />

    </div>
  )
}

export default App