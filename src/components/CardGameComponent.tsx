interface Props {
  srcImg: string,
  href?:string,
  titulo:string,
  adsCount:number
}

export default function CardGameComponent ({ 
    srcImg, titulo, adsCount, href 
  }:Props
){
  return (
      <div className="carousel-item overflow-hidden rounded-lg ">
       <figure className="w-full cursor-pointer relative">  
        <img className="w-64 rounded-lg"
          title={titulo}
          alt={titulo}
          src={ srcImg } 
        />
        <figcaption className='bg-zinc-900/70 px-4 w-64 rounded-t-lg absolute top-0'>
          <h1 
            className='text-white block font-bold text-sm'
           title={titulo}>
              { 
                (titulo.length > 26) 
                  ? titulo?.substring(0,25)+"..."
                  : titulo
               }</h1>
          <span className='text-zinc-300 text-xs block m-1'>{ adsCount } anúncio(s)</span>
        </figcaption>
      </figure>
      </div>
  );
}