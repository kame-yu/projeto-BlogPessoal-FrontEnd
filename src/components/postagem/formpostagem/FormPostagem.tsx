/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    // ... (TODA A SUA LÓGICA DE FUNÇÕES PERMANECE IDÊNTICA) ...
    // ... (buscarPostagemPorId, buscarTemas, atualizarEstado, etc.) ...
    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
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
            ToastAlerta("Você precisa estar logado!", "erro");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                });
                ToastAlerta("Postagem atualizada com sucesso!", "sucesso")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar a Postagem.","erro")
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token, },
                })
                ToastAlerta("Postagem cadastrada com sucesso!", "sucesso")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar Postagem.","erro")
                }
            }
        }
        setIsLoading(false)
        retornar() 
    }

    const carregandoTema = tema.descricao === '';

  return (
    // AQUI: O fundo do card bg-slate-800 está bom, 
    // pois ele é um modal que fica sobre o bg-slate-900 da página.
      <form className="flex flex-col w-full gap-6
                       bg-slate-800 p-8 rounded-lg shadow-xl
                       max-h-[90vh] overflow-y-auto"
            onSubmit={gerarNovaPostagem}>
        
        {/* AQUI: Cor do título principal */}
        <h1 className="text-3xl font-bold text-center -mt-2 mb-2 text-orange-300">
            {id === undefined ? 'Cadastrar Postagem' : 'Editar Postagem'}
        </h1>
        
        {/* Campo Título */}
        <div className="flex flex-col gap-2">
          {/* AQUI: Cor da label */}
          <label htmlFor="titulo" className="text-orange-200 mb-1 text-sm font-semibold">
            Título da Postagem
          </label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            // AQUI: Cores de texto, placeholder e foco
            className="border-2 border-slate-700 rounded-lg p-3 bg-slate-900
                       text-orange-100 placeholder:text-slate-400 
                       focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        {/* Campo Texto (Textarea) */}
        <div className="flex flex-col gap-2">
          {/* AQUI: Cor da label */}
          <label htmlFor="texto" className="text-orange-200 mb-1 text-sm font-semibold">
            Texto da Postagem
          </label>
          <textarea
            placeholder="Escreva sua postagem..."
            name="texto"
            required
            // AQUI: Cores de texto, placeholder e foco
            className="border-2 border-slate-700 rounded-lg p-3 bg-slate-900
                       text-orange-100 placeholder:text-slate-400 
                       focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500
                       h-40 resize-y"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
          />
        </div>

        {/* Campo Tema (Select) */}
        <div className="flex flex-col gap-2">
          {/* AQUI: Cor da label */}
          <p className="text-orange-200 mb-1 text-sm font-semibold">Tema da Postagem</p>
          <select
            name="tema"
            id="tema"
            // AQUI: Cores de texto e foco
            className="border-2 border-slate-700 rounded-lg p-3 bg-slate-900
                       text-orange-100 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected hidden>
              Selecione um Tema
            </option>
            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>{tema.descricao}</option>
            ))}
          </select>
        </div>

        {/* AQUI: Botão principal atualizado */}
        <button
          type="submit"
          className="rounded-lg text-slate-100 bg-yellow-900 hover:bg-yellow-800
                     w-full py-3 flex justify-center
                     font-bold text-lg transition-all duration-300 mt-4
                     border-2 border-slate-700
                     disabled:bg-slate-600"
          disabled={carregandoTema && id === undefined}
        >
          { isLoading ? 
            <ClipLoader 
              color="#ffffff" 
              size={24}
            /> : 
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          }
        </button>
      </form>
  );
}

export default FormPostagem;