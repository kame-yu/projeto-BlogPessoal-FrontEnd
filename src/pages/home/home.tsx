import hello from '../../assets/hello.png';
import logohome from '../../assets/logohome.png';
import ListaPostagens from '../../components/postagem/listapostagens/ListaPostagens';
import ModalPostagem from '../../components/postagem/modalpostagem/ModalPostagem';

function Home() {
  return (

    <div className="bg-sky-950 min-h-screen">

      <div className="relative bg-sky-900 flex grow justify-center">
        <img
          src={logohome}
          alt="Fundo"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 container grid grid-cols-2 text-orange-300">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold text-center">Saudações, invocador!</h2>
            <p className="text-xl text-orange-200 text-center">Bem vindo ao meu blog, sinta-se à vontade para compartilhar<br /> suas ideias e pensamentos sobre o nosso tão amodiado jogo.<br /> </p>
            <div className="flex justify-around gap-4">
              <ModalPostagem />
            </div>
          </div>
          <div className="flex justify-center">
            <img src={hello} alt="Imagem da Página Home" className="w-2/3" />
          </div>
        </div>
      </div>

      <ListaPostagens />

    </div>
  )
}

export default Home