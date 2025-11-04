/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token 

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any){
            if (error.toString().includes('401')) {
                handleLogout()
                }
            }
        }

        useEffect(() => {
            if (token === '') {
                ToastAlerta("Você precisa estar logado!", "erro")
                navigate ('/')
            }
        }, [token])

        useEffect(() => {
            if (id !== undefined) {
                buscarPorId(id)
            }
        }, [id])

        function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
            setTema({
                ...tema,
                [e.target.name]: e.target.value
            })
        }

        function retornar () {
            navigate("/temas")
        }

        async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
            e.preventDefault()
            setIsLoading(true)

            if (id !== undefined) {
                // Atualizar
                try {
                    await atualizar (`/temas`, tema, setTema, {
                        headers: { 'Authorization': token}
                    })
                    ToastAlerta("O tema foi atualizado com sucesso!", "sucesso")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error:any) {
                    if (error.toString().includes('401')) {
                        handleLogout()
                    } else {
                        ToastAlerta("Erro ao atualizar o tema.", "erro")
                    }
                }
            } else {
                // Cadastrar
                try {
                    await cadastrar(`/temas`, tema, setTema, {
                        headers: { 'Authorization': token }
                    })
                    ToastAlerta("O tema foi cadastrado com sucesso!", "sucesso")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    if (error.toString().includes('401')) {
                        handleLogout();
                    } else {
                        ToastAlerta("Erro ao cadastrar o tema.", "erro")
                    }
                }
            }
            setIsLoading(false)
            retornar()
        }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto py-12">
            
            <h1 className="text-4xl text-center my-8 text-slate-100">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-full max-w-lg flex flex-col gap-6 
                           bg-slate-800 p-8 rounded-lg shadow-2xl border border-slate-700"
                onSubmit={gerarNovoTema}>
                
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="descricao" 
                        className="text-slate-300 mb-1 text-sm font-semibold">
                            Descrição do Tema
                    </label>
                    <input 
                        type="text" 
                        placeholder="Descreva aqui seu tema" 
                        name='descricao' 
                        className="border-2 border-slate-700 rounded-lg p-3 bg-slate-900 
                                   text-slate-100 placeholder:text-slate-500 
                                   focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" 
                        value={tema.descricao} 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} 
                    />
                </div>

                <button 
                    className="rounded-lg text-white bg-teal-600 hover:bg-teal-700 
                               w-full py-3 flex justify-center 
                               font-bold text-lg transition-all duration-300 mt-4" 
                    type="submit">

                    { isLoading ?
                        <ClipLoader color="#c4ab67" size={24} /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
            
            </div> 
    )
}

export default FormTema