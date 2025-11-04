/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "erro")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta("Postagem apagada com sucesso!", "sucesso")

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlerta("Erro ao deletar postagem.", "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    return (
        <div className='container w-full max-w-lg mx-auto py-12'>
            <h1 className='text-4xl text-center my-4 text-slate-100'>Deletar Postagem</h1>

            <p className='text-center text-lg text-slate-300 mb-6'>
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className='border border-slate-700 flex flex-col rounded-lg 
                            overflow-hidden justify-between bg-slate-800 shadow-2xl'>
                
                <header
                    className='py-3 px-6 bg-slate-700 text-white font-bold text-2xl'>
                    Postagem
                </header>
                
                <div className='p-6 flex flex-col gap-2'>
                    <p className='text-2xl h-full text-white'>{postagem.titulo}</p>
                    <p className='text-slate-300'>{postagem.texto}</p>
                </div>
                
                <div className='flex justify-end gap-4 p-4 bg-slate-900 border-t border-slate-700'>
                    <button
                        className='rounded-md border border-slate-500 text-slate-300 font-semibold
                                   hover:bg-slate-700 transition-all px-6 py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    
                    <button
                        className='rounded-md bg-red-900 text-white font-semibold
                                   hover:bg-red-800 transition-all px-6 py-2
                                   flex items-center justify-center min-w-[90px]'
                        onClick={deletarPostagem}>
                        
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={20}
                            /> : 
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem