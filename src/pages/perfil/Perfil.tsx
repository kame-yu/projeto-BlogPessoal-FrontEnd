/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "erro")
      navigate("/")
    }
  }, [usuario.token])

  return (
    <div className="container mx-auto max-w-2xl py-12">
      
      <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
        
        <img
          className="w-full h-56 object-cover" 
          src="https://img2.wallspic.com/crops/5/3/6/0/4/140635/140635-game-graphic_design-fun-anime-fictional_character-7357x5000.jpg"
          alt="Capa do Perfil"
        />
        <div className="p-6">

          <div className="flex justify-center">
            <img
              className="w-40 h-40 rounded-full object-cover 
                         border-4 border-slate-300 bg-slate-900 
                         -mt-24 z-10 shadow-lg" 
              src={usuario.foto && usuario.foto.trim() !== "" ? usuario.foto : "https://i.pinimg.com/736x/fa/9f/14/fa9f1471407d4f49630dff9433010068.jpg"}
              alt={`Foto de perfil de ${usuario.nome || "usuário"}`}
            />
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-3xl font-bold text-white">{usuario.nome}</h2>
            <p className="text-slate-400 text-lg">{usuario.usuario}</p>
          </div>


          <div className="mt-8 border-t border-slate-700 pt-6">
            <h3 className="text-xl font-semibold text-white text-center">
              Minhas Postagens
            </h3>
            <p className="text-slate-400 text-center mt-2">
              (Em breve, suas postagens aparecerão aqui.)
            </p>
            {/* Atualização futura: Cards de postagens na pag de usuario.
            */}
          </div>

        </div>
      </div>
    </div> // Fim do container
  )
}

export default Perfil