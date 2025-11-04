/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardTema from "../cardtema/CardTema";

function ListaTemas() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if(token === '') {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  async function buscarTemas() {
    try {
      setIsLoading(true) 
      await buscar('/temas', setTemas, {
        headers: { Authorization: token }
        })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout()
        }
      } finally {
        setIsLoading(false);
      }
  }

  // MUDANÇA: O trigger [temas.length] causava uma busca duplicada.
  // [token] garante que a busca ocorra uma vez quando o token estiver presente.
  useEffect(() => {
    buscarTemas()
  }, [token])

  function renderContent() {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full py-32">
          <SyncLoader
            color="#c4ab67" 
            size={32}
          />
        </div>
      );
    }

    if (temas.length === 0) {
      return (
        <span className="text-3xl text-center my-8 text-slate-100">
          Nenhum Tema foi encontrado!
        </span>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {temas.map((tema) => (
          <CardTema key={tema.id} tema={tema} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto py-12">
        <h1 className="text-4xl text-center my-4 text-slate-100 mb-10">
            Temas Cadastrados:
        </h1>

        {renderContent()}
      </div>
    </>
  )
}

export default ListaTemas