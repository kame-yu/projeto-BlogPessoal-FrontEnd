import hello from '../../assets/hello.png';
import logohome from '../../assets/logohome.png';
function Home() {
  return (
    <>
      <div className="relative bg-sky-900 flex grow justify-center">
        {/* imagem com textura */}
        <img
          src={logohome}
          alt="Fundo"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        {/*texto acima da imagem*/}
        <div className="relative z-10 container grid grid-cols-2 text-orange-300">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold text-center">Saudações, invocador!</h2>
            <p className="text-xl text-orange-200 text-center">Bem vindo ao meu blog, sinta-se à vontade para compartilhar<br /> suas ideias e pensamentos sobre o nosso tão amodiado jogo.<br /> </p>
            <div className="flex justify-around gap-4">
              <div className="rounded bg-yellow-900 text-slate-100 font-bold hover:bg-yellow-700 cursor-pointer border-yellow-800 border-solid border-2 py-2 px-4">
                Nova postagem
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={hello} alt="Imagem da Página Home" className="w-2/3" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home