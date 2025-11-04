import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import FormPostagem from '../formpostagem/FormPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button
                        className='rounded bg-yellow-900 text-slate-100 font-bold hover:bg-yellow-700 cursor-pointer border-yellow-800 border-solid border-2 py-2 px-4'>
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                background: 'transparent',
    border: 'none',
    padding: '0',        // Remove todo o padding padrão
    boxShadow: 'none',   // Remove a sombra padrão
    maxWidth: '42rem',   // Define um tamanho máximo (igual a max-w-2xl do Tailwind)
    width: '90%'         // Garante que seja responsivo em telas menores
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    );
}

export default ModalPostagem;