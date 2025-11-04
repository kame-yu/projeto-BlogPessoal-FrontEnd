/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importando o Link
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  // ... (Toda a sua lógica de funções permanece idêntica) ...
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])

  function retornar(){
    navigate('/')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try {
      await cadastrarUsuario(
        `/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      ToastAlerta("Erro ao cadastrar usuário.", "erro")
    }
    }else{
      ToastAlerta("Verifique os dados e tente novamente.", "erro")
      setUsuario({...usuario, senha: ""})
      setConfirmarSenha("")
    }
    setIsLoading(false)
    }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-bold ">

        <div className="flex items-center justify-center w-full h-full bg-sky-950 p-8">
            
          <form 
              className="flex flex-col justify-center gap-4 w-full max-w-md 
                         p-8 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-2xl"
              onSubmit={cadastrarNovoUsuario}
          >

            <h2 className='text-orange-300 text-4xl text-center mb-4'>Cadastro</h2>
            
            <div className="flex flex-col w-full">
              <label htmlFor="nome" className="text-slate-300 mb-1 text-sm">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Seu nome completo"
                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                           text-orange-100 placeholder:text-slate-500 
                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                value = {usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="usuario" className="text-slate-300 mb-1 text-sm">Usuario (E-mail)</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder="teemo@email.com"
                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                           text-orange-100 placeholder:text-slate-500 
                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                value = {usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="foto" className="text-slate-300 mb-1 text-sm">Foto (URL)</label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="URL da sua foto de perfil"
                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                           text-orange-100 placeholder:text-slate-500 
                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                value = {usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              {/* // AQUI: Linha corrigida. O texto extra foi removido. */}
              <label htmlFor="senha" className="text-slate-300 mb-1 text-sm">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Senha (mínimo 8 caracteres)"
                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                           text-orange-100 placeholder:text-slate-500 
                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                value = {usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="confirmarSenha" className="text-slate-300 mb-1 text-sm">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme sua Senha"
                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                           text-orange-100 placeholder:text-slate-500 
                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                value={confirmarSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              />
            </div>

            <div className="flex justify-around w-full gap-4 mt-2">
              <button
                  type='button' 
                  className='rounded text-slate-100 bg-slate-700 hover:bg-slate-600 
                            w-full py-3 font-bold transition-all duration-300'
                  onClick={retornar}
                >
                Cancelar
              </button>
              <button 
                  type='submit'
                  className='rounded text-slate-100 bg-yellow-900 hover:bg-yellow-800 
                            w-full py-3 flex justify-center font-bold transition-all duration-300' 
                >
                { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                  <span>Criar conta</span>
                }
              </button>
            </div>

            <hr className="border-slate-700 w-full" />

            <p className="text-slate-300 text-center text-sm">
                Já tem uma conta?{' '}
                <Link to="/" className="text-orange-300 hover:underline">
                    Login
                </Link>
            </p>

          </form>
        </div>

        <div 
            className="lg:block hidden bg-no-repeat w-full h-full bg-cover bg-right
                     bg-[linear-gradient(to_right,#082f49_0%,#0f172a80_15%,transparent_30%),url('https://cdn12.idcgames.com/storage/image/1106/norra/default.jpg')]"
        ></div>
        
      </div>
    </>
  )
}

export default Cadastro