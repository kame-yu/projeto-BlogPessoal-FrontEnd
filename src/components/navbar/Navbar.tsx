
function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-cyan-700 font-semibold text-orange-100">
        <div className="container flex justify-between text-lg mx-8">
          <div className='hover:underline'>Nexus Blog</div>

          <div className="flex gap-6">
            <span>Postagens</span>
            <span>Temas</span>
            <span>Cadastrar Tema</span>
            <span>Perfil</span>
            <span>Sair</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar