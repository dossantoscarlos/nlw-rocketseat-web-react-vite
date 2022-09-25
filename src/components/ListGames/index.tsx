import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import Game from "../../interfaces/Game";
import CardGameComponent from "../CardGameComponent";
import { URL_BASE_API } from '../../util/index';
import axios from "axios";
import { X } from "phosphor-react";
import { styled } from "@stitches/react";
import '../../App.css'

interface Props {
  updated: boolean
}
export const ListGames =  ({updated}:Props) => {
  const [games, setGames] = useState<Game[]>([])

  function requestApi () { 
    axios(URL_BASE_API+'/games/list').then((response) => setGames(response.data));
  }

  const gameList = games.map(game => {
      return (     
        <CardGameComponent
          data={game}
          key={game.id} />
      );
    })
  

  const Overlay = styled(Dialog.Overlay, {
    background: 'rgba(0 0 0 / 0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'list-item',
    placeItems: 'center',
    overflow:"hidden"
  });
 
   const Content = styled(Dialog.Content, {
    position:'fixed',
    top:0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'list-item',
    overflowY: "scroll",
    overflow:"auto"
  });

  return (
    <Dialog.Root>
        <Dialog.Trigger onClick={requestApi}>
          <div className='w-72 rounded bg-nlw-gradient my-4 p-1 mt-8 text-center text-lg text-white'>
            <div className=' bg-[#2A2634] p-1'>
              <h1 className='font-black/90 hover:underline text-lg' >Ver mais...</h1>
            </div>
          </div>
        </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay className='bg-black/80 inset-0 fixed'/>
        <Content className='fixed bg-[#2A2634] px-8 pt-10 pb-5 text-white w-full h-full rounded-lg bg-blend-overlay shadow-lg shadow-black/25'>
          <Dialog.Title className='text-2xl font-black flex justify-between'>
            <span className="bg-nlw-gradient text-transparent bg-clip-text text-4xl">Lista de Jogos</span>
            <Dialog.Close className="rounded-2xl p-2 bg-violet-700 hover:bg-violet-500">
              <X size={32}/>
            </Dialog.Close>
          </Dialog.Title>
          <hr className="bg-nlw-gradient pt-1 mt-2 rounded"/>
          <div className='mt-8 grid grid-cols-5 gap-5'>          
            {gameList}          
          </div>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}