import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { useState, useEffect, FormEvent } from "react";
import CreateAdBanner from "../CreateBannerAdComponent";
import { Input, Options } from "../Form/Index";
import axios from 'axios';
import { URL_BASE_API } from '../../util'



interface Game {
  id:string;
  title:string;
}

interface CallBackParent {
  saveAdsCallbackParent : (bool:boolean) => void
}


export const Modal = ({ saveAdsCallbackParent }:CallBackParent) => {
  const [ games, setGames ] = useState<Game[]>([])
  const [useVoiceChannel,setUseVoiceChannel] = useState(false)
  
  const [weekDays, setWeekDays] = useState<string[]>([])
  const toggleItems = [
    {id: 0, title:"Domingo", label: "D" },
    {id: 1, title:"Segunda", label: "S" },
    {id: 2, title:"Terça"  , label: "T" },
    {id: 3, title:"Quarta" , label: "Q" }, 
    {id: 4, title:"Quinta" , label: "Q" },
    {id: 5, title:"Sexta"  , label: "S" },
    {id: 6, title:"Sabado" , label: "S" },
  ];

  useEffect(() => {
    fetch(URL_BASE_API+"/games/list")
    .then(response => response.json())
    .then(data => setGames(data))
  },[]);

  const handleUpdatedSaveAds = (bool:boolean) => {
    if(bool)
      fetch(URL_BASE_API+"/games/list")
      .then(response => response.json())
      .then(data => setGames(data))
  }

  const optionGames = games.map(game => <Options value= {game.id} key={game.id} text={game.title}/>)


  async function handleSubmit (event :FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData);
    console.log(data.game)
    try{
      await axios.post(URL_BASE_API+`/games/${data.game}/ads`,{
        name:data.name,
        yearsPlaying: data.yearsPlaying,
        weekDays,
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel
      }).then(response => {
        saveAdsCallbackParent(true);
        handleUpdatedSaveAds(true);
      })

      alert('anúncio criado com sucesso!!!')
    }catch(err){
      console.error(err)
      alert(err)
    }
  } 


 return (
  <Dialog.Root>
    <CreateAdBanner/>
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/80 inset-0 fixed'/>
    <Dialog.Content className='fixed bg-[#2A2634] px-8 pt-10 pb-5 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-lg shadow-lg shadow-black/25'>
      <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
      <hr className='my-2 -mb-4' />
        <form onSubmit={handleSubmit} className='mt-8 text-sm '>
            <div className='flex flex-col gap-2 mb-2'>
              <label htmlFor='game'>Qual o game?</label>
              <select id='game'  name='game'  required className="form-select py-2 px-3 bg-zinc-900 text-sm placeholder:text-zinc-400 rounded" defaultValue={""}>
                <option disabled  value="">Selecione o jogo que deseja jogar.</option>
                { optionGames }
              </select>
              </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input 
                id={"name"} 
                name="name" 
                type={"text"}
                required
                placeholder= {"Como te chamam dentro do game?"}
              />
            </div>

            <div className='grid grid-cols-2 gap-6 my-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor={"yearsPlaying"}>Joga há quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type={"number"}
                  min={0}
                  required
                  placeholder={"Tudo bem ser Zero"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={"discord"} >Qual seu discord?</label>
                <Input 
                  id='discord'
                  name='discord'
                  type={"text"}
                  required
                  placeholder={"Usuario#0000"}
                />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label >Quanto Costuma jogar?</label>
                <div className='flex flex-row py-1'>
                  <ToggleGroup.Root 
                    value={weekDays}
                    onValueChange={setWeekDays}
                    type='multiple'>
                   {toggleItems.map(item => <ToggleGroup.Item 
                      key={item.id} 
                      title={item.title} 
                      value={item.id.toString()} 
                      className={
                        `h-8 w-5 
                        ${weekDays.includes(item.id.toString())
                          ?'bg-violet-600'
                          :'bg-zinc-900'}`
                        }>
                      {item.label}
                    </ToggleGroup.Item>
                  )}
                    </ToggleGroup.Root>       
                </div>
              </div>
              <div className='flex flex-col gap-2 flex-1' >
                <label htmlFor='hoursStart'> Qual Horario do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input required id={"hourStart"} name="hourStart" type={"time"} placeholder='De' className="" />
                  <Input required id={'hourEnd'} name='hourEnd' type={"time"} placeholder='até'/>
                </div>
              </div>
            </div>

            <label className='flex flex-row items-center gap-2 mt-4'>
              <Checkbox.Root 
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if(checked === true){
                    setUseVoiceChannel(true)
                  }else if(checked === false) {
                    setUseVoiceChannel(false)
                  } 
                }}
                className='w-6 h-6 bg-zinc-900 p-1 rounded'>
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400"/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conenctar ao chat de voz
            </label>

            <footer className='flex flex-row gap-4 justify-end mt-4'>
              <Dialog.Close className='bg-zinc-400 p-2 rounded'>
                Cancelar
              </Dialog.Close>
              <button className='rounded-sm p-2 gap-2 bg-violet-600 hover:bg-violet-500 flex items-center justify-center'>
               <GameController size={18}/> Encontrar duo
              </button>
            </footer>
        </form>
    </Dialog.Content>
  </Dialog.Portal>
  </Dialog.Root>
 );
} 