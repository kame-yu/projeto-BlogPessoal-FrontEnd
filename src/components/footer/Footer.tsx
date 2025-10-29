import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'

function Footer() {
  const data = new Date().getFullYear()
  return (
    <>
      <div className="w-full flex justify-center bg-sky-950 text-orange-100 overflow-hidden">
        <div className="container flex flex-col items-center py-4">
          <p className='text-xl font-bold m-0'>Eric Silva - Generation Brasil | Copyright: {data}</p>
          <p className='text-lg m-0'>Acesse nossas Redes Sociais</p>
          <div className="flex gap-2 text-orange-100">
            <LinkedinLogoIcon size={48} weight='bold' />
            <InstagramLogoIcon size={48} weight='bold' />
            <FacebookLogoIcon size={48} weight='bold' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer