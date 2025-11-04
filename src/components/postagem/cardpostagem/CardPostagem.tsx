import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='bg-slate-800 text-slate-200 
                        flex flex-col rounded-lg overflow-hidden justify-between shadow-xl h-full'>

            <div>

                <div className="flex w-full bg-teal-700 py-2 px-4 items-center gap-3">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-10 w-10 rounded-full object-cover border-2 border-slate-300' 
                        alt={postagem.usuario?.nome} />
                    <h3 className='text-base font-bold text-slate-100 uppercase'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
            </div>

            <div className='p-4 flex flex-col gap-3 grow'>

                <div>
                    <span className='inline-block bg-teal-800 text-teal-100 
                                     text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide'>
                        {postagem.tema?.descricao}
                    </span>
                </div>
                
                <h4 className='text-xl font-semibold text-white uppercase'>{postagem.titulo}</h4>
                
                <p className='text-slate-300'>{postagem.texto}</p>
                
                <p className='text-sm text-slate-400'>Data: {new Intl.DateTimeFormat("pt-BR", {
                    dateStyle: 'short', 
                    timeStyle: 'short', 
                }).format(new Date(postagem.data))}</p>
            </div>

            <div className="flex gap-4 p-4 justify-end border-t border-slate-700">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='rounded-md border border-slate-300 text-slate-300 font-semibold
                               hover:bg-slate-800 hover:text-white transition-all
                               px-5 py-2 text-sm'>
                    Editar
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
                    className='rounded-md bg-red-700 text-white font-semibold
                               hover:bg-red-800 transition-all
                               px-5 py-2 text-sm'>
                    Deletar
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem