import { Link } from 'react-router-dom'
import type Tema from '../../../models/Tema'

interface CardTemaProps{
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='bg-slate-800 text-slate-200 
                        flex flex-col rounded-lg overflow-hidden justify-between shadow-xl h-full'>

            <header className='py-3 px-6 bg-teal-700 text-white font-bold text-lg'>
                {/*IMPORTANTE: INCLUIR O NÚMERO DO ID DO TEMA NO CARD*/}
                Tema {tema.id}
            </header>

            <div className='p-6 grow'>
                <p className='text-2xl text-slate-100'>
                    {tema.descricao}
                </p>
            </div>
            
            <div className="flex gap-4 p-4 justify-end border-t border-slate-700">
                
                <Link to={`/editartema/${tema.id}`}
                    className='rounded-md border border-slate-300 text-slate-300 font-semibold
                               hover:bg-slate-800 hover:text-white transition-all
                               px-5 py-2 text-sm'>
                    Editar
                </Link>

                <Link to={`/deletartema/${tema.id}`}
                    className='rounded-md bg-red-700 text-white font-semibold
                               hover:bg-red-800 transition-all
                               px-5 py-2 text-sm'>
                    Deletar
                </Link>
            </div>

        </div>
    )
}

export default CardTema