import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logonavbar.png';
import { AuthContext } from "../../contexts/AuthContext";
function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }

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
            <Link to='/postagens' className='hover:underline'>Postagens</Link>
            <Link to='/temas' className='hover:underline'>Temas</Link>
            <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
            <span>Perfil</span>
            <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar