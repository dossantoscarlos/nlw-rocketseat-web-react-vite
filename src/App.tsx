import { useEffect, useState } from 'react';
import logoImg from './assets/Logo.svg';
import CardGameComponent from './components/CardGameComponent';
import { Modal } from './components/Modal'
import axios from 'axios' 
import './App.css';
import GridCarousel from '@yoge-shource/grid-carousel-react';
interface Game {
  bannerUrl:string;
  id:string;
  title:string;
  _count:  {
    ads: number;
  };
}

export default function App() {

  const [ games, setGames ] = useState<Game[]>([])
  const URL_BASE:string = 'https://nlw-api-nest.herokuapp.com' 


  useEffect(() => {
    axios(URL_BASE+"/games")
    .then(response => { 
      setGames(response.data);
    });
  },[]);

  return (
     <div className="max-w-6xl mt-4 mx-auto p-5 sm:p-4 flex flex-col items-center">
      <img src={logoImg} alt=""  />
      <h1 className="md:text-6xl text-4xl mb-10 md:mb-0 font-black text-white mt-4">Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> esta aqui.</h1>
      <div className='mt-4'>          
          <GridCarousel 
            carouselData={games}
            dots={true}
            customScrollbar={false}
            numberOfItemToScroll={1}
            numberOfCardsToShow={4}>

            { games.map(game => ( 
                <CardGameComponent 
                  srcImg={game.bannerUrl} 
                  titulo={game.title} 
                  adsCount={game._count.ads} 
                  key={game.id} 
                  />
              )
            )}
          </GridCarousel>       
      </div>
      <Modal />
    </div>
  )
} 
''