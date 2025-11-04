/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            {/* - Grid principal: removi 'place-items-center' para que as colunas ocupem 100% da altura.
              - Usei 'min-h-screen' para garantir que cubra a tela toda.
            */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-bold ">

                {/* - Lado Esquerdo (Formulário):
                  - Adicionado um 'div' wrapper para centralizar o conteúdo.
                  - 'bg-sky-950' define o fundo azul escuro, mantendo a identidade visual
                    que combina com o gradiente da imagem à direita.
                */}
                <div className="flex items-center justify-center w-full h-full bg-sky-950 p-8">
                    
                    {/* - Container do Formulário (O "container escurecido" que você pediu):
                      - 'max-w-md' e 'w-full' o tornam responsivo.
                      - 'bg-slate-900/50' ou 'bg-black/30' cria a translucidez.
                      - 'backdrop-blur-sm' adiciona o efeito de vidro fosco.
                      - 'p-8' e 'rounded-lg' dão o espaçamento e acabamento "leve".
                    */}
                    <form 
                        className="flex flex-col justify-center gap-4 w-full max-w-md 
                                   p-8 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-2xl"
                        onSubmit={login}
                    >

                        <h2 className="text-orange-300 text-4xl text-center mb-4">Entrar</h2>
                        
                        <div className="flex flex-col w-full">
                            <label htmlFor="usuario" className="text-slate-300 mb-1 text-sm">E-mail</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="yuumi@email.com"
                                // Input com fundo translúcido e foco laranja para coesão
                                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                                           text-orange-100 placeholder:text-slate-500 
                                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        
                        <div className="flex flex-col w-full">
                            <label htmlFor="senha" className="text-slate-300 mb-1 text-sm">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                className="border-2 border-slate-700 rounded p-2 bg-slate-800/50 
                                           text-orange-100 placeholder:text-slate-500 
                                           focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        
                        <button
                            type='submit'
                            // Botão com 'w-full' e cor laranja para combinar com os textos.
                            className="rounded bg-yellow-900 flex justify-center font-bold
                                       hover:bg-yellow-800 transition-all duration-300 text-slate-100 
                                       w-full py-3 px-4 cursor-pointer mt-2"
                        >
                            {isLoading ?
                                <ClipLoader
                                    color="#ffffff"
                                    size={24}
                                /> :
                                <span>Login</span>
                            }
                        </button>

                        <hr className="border-slate-700 w-full" />

                        <p className="text-slate-300 text-center text-sm">
                            Ainda não tem uma conta?{' '}
                            <Link to="/cadastro" className="text-orange-300 hover:underline">
                                Cadastre-se
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
    );
}

export default Login;