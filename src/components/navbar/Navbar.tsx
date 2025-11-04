import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logonavbar.png';
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }


     let component: ReactNode

    if (usuario.token !== "") {

        component = (
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
            <Link to='/perfil' className='hover:underline'>Perfil</Link>
            <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
          </div>
        </div>
      </div>
    </>
        )
    }

    return (
        <>
            { component }
        </>
    )
}

export default Navbar