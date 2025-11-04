import { GithubLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { useContext, type ReactNode } from "react"
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    // eslint-disable-next-line prefer-const
    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode
    
        if (usuario.token !== "") {
    
            component = ( 
    <>
      <div className="w-full flex justify-center bg-sky-950 text-orange-100 overflow-hidden  bg-linear-to-b from-sky-950 to-slate-800">
        <div className="container flex flex-col items-center py-4">
          <p className='text-xl font-bold m-0'>Eric Silva - Generation Brasil | Copyright: {data}</p>
          <p className='text-lg m-0'>Entre em contato:</p>
          <div className="flex gap-2 text-orange-100">
<a
                        href= "https://www.linkedin.com/in/eric-silva-is-a-dev/"
                        target="_blank"
                        className="hover:text-[#fffce9] transition-colors duration-300">

                        <LinkedinLogoIcon size={40} weight='regular' />   </a>

                        <a href = "https://wa.me/5585981788783" target="_blank"
                        className="hover:text-[#fffce9] transition-colors duration-300">
                        <WhatsappLogoIcon size={40} weight='regular' />
                        </a>

                        <a href = "https://github.com/kame-yu" target="_blank"
                        className="hover:text-[#fffce9] transition-colors duration-300">
                        <GithubLogoIcon size={40} weight='regular' />
                        </a>
          </div>
        </div>
      </div>
    </>

            )
        }

    return (
        <>
            { component }
        </>
    )
}

export default Footer