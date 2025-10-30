import { Link } from 'react-router-dom';
import logo from '../../assets/logonavbar.png'; // NOVO: Importe sua logo aqui
function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-cyan-800 font-semibold text-orange-100">

        <div className="container flex justify-between text-lg mx-8">
          
          <div className='hover:underline flex items-center gap-3'>
              <img
              src={logo}
              alt="Logo Nexus Blog"
              className="h-10 w-auto" // Define uma altura (ex: 40px) e largura automática
            />

            <Link to='/home'>Nexus Blog</Link>
          </div>

          <div className="flex gap-6">
            <span>Postagens</span>
            <span>Temas</span>
            <span>Cadastrar Tema</span>
            <span>Perfil</span>
            <span>Sair</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar