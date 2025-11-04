/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
      {/* AQUI: O grid-cols-2 está correto, mantendo o layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        
        {/* AQUI: O formulário veio PRIMEIRO, para ficar à esquerda */}
        <form className='flex justify-center items-center flex-col w-2/3 gap-3'
            onSubmit={cadastrarNovoUsuario}>

          {/* AQUI: Cor do título */}
          <h2 className='text-orange-300 text-5xl'>Cadastrar</h2>
          
          <div className="flex flex-col w-full">
            {/* AQUI: Cor da label */}
            <label htmlFor="nome" className="text-orange-200">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              // AQUI: Estilização completa do input
              className="border-2 border-slate-700 rounded p-2 bg-gray-950 text-orange-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              value = {usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            {/* AQUI: Cor da label */}
            <label htmlFor="usuario" className="text-orange-200">Usuario (E-mail)</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="teemo@email.com"
              // AQUI: Estilização completa do input
              className="border-2 border-slate-700 rounded p-2 bg-gray-950 text-orange-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            {/* AQUI: Cor da label */}
            <label htmlFor="foto" className="text-orange-200">Foto (URL)</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da sua foto de perfil"
              // AQUI: Estilização completa do input
              className="border-2 border-slate-700 rounded p-2 bg-gray-950 text-orange-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            {/* AQUI: Cor da label */}
            <label htmlFor="senha" className="text-orange-200">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha (mínimo 8 caracteres)"
              // AQUI: Estilização completa do input
              className="border-2 border-slate-700 rounded p-2 bg-gray-950 text-orange-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            {/* AQUI: Cor da label */}
            <label htmlFor="confirmarSenha" className="text-orange-200">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua Senha"
              // AQUI: Estilização completa do input
              className="border-2 border-slate-700 rounded p-2 bg-gray-950 text-orange-100 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
                type='reset'
                // AQUI: Botão secundário (Cancelar) com cores do tema
                className='rounded text-slate-100 bg-red-900 hover:bg-red-800 
                          w-1/2 py-2 border-slate-700 border-solid border-2 font-bold'
                onClick={retornar}
              >
              Cancelar
            </button>
            <button 
                type='submit'
                // AQUI: Botão principal (Cadastrar) idêntico ao de Login
                className='rounded text-slate-100 bg-yellow-900 hover:bg-yellow-800 
                          w-1/2 py-2 flex justify-center border-slate-700 border-solid border-2 font-bold' 
              >
              { isLoading ? 
                <ClipLoader 
                  color="#ffffff" 
                  size={24}
                /> : 
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>

        {/* AQUI: A div da imagem veio DEPOIS, para ficar à direita */}
        <div className="lg:block hidden bg-no-repeat w-full min-h-screen bg-cover bg-right
                        bg-[linear-gradient(to_right,#0f172a_0%,#0f172a80_15%,transparent_30%),url('https://i.imgur.com/ZZFAmzo.jpg')]"
        ></div>
        
      </div>
    </>
  )
}

export default Cadastro