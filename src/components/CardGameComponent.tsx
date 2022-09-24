import Game from '../interfaces/Game'
interface Props {
  data: Game
}


export default function CardGameComponent ({ data }:Props){
  
  return (
    <>
    <figure className="w-full cursor-pointer relative">  
      <img className="rounded-lg w-full"
        title={data.title}
        alt={data.title}
        src={ data.bannerUrl } 
      />
      <figcaption className='bg-zinc-900/70 w-full px-4 py-2 rounded-t-lg absolute top-0'>
        <h1 className='text-white block font-bold text-sm' title={data.title}>
          { (data.title.length > 26) ? data.title?.substring(0,25)+"..." : data.title }
        </h1>
        <span className='text-zinc-300 text-xs block m-1'>{ data._count.ads } anúncio(s)</span>
      </figcaption>
    </figure>
    </>
  );
}