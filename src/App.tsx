import { useEffect, useState } from 'react';
import logoImg from './assets/Logo.svg';
import CardGameComponent from './components/CardGameComponent';
import { Modal } from './components/Modal'
import axios from 'axios' 
import './App.css';
import Game from './interfaces/Game';
import { URL_BASE_API } from './util';
import { ListGames } from './components/ListGames';
export default function App() {
 
  const [ games, setGames ] = useState<Game[]>([]);
  const [updated , setUpdated] = useState(false);
  useEffect(() => {
    axios(URL_BASE_API+"/games")
    .then(response => { 
      setGames(response.data);
      setUpdated(true);
    });
  },[]);

  const mapGames = games.map(game => <CardGameComponent
    data={game}
    key={game.id} />
  )

  function saveAdsCallbackParent(bool:boolean):void {
    if(bool)
      axios(URL_BASE_API+"/games")
      .then(response => { 
        setGames(response.data);
      });
  }  

  return (
     <div className="max-w-6xl mt-2 mx-auto p-5 sm:p-4 flex flex-col items-center">
      <img src={logoImg} alt=""  />
      <h1 className="md:text-6xl text-4xl mb-10 md:mb-0 font-black text-white mt-4">Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> esta aqui.</h1>
      <div className='mt-8 grid grid-cols-6 gap-5 px-6'>          
        { mapGames }
      </div>
      <ListGames updated={updated} />
      <Modal saveAdsCallbackParent={(bool) => saveAdsCallbackParent(bool)} />
    </div>
  )
} 
