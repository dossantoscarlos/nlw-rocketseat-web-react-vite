import * as Dialog from "@radix-ui/react-dialog";

export const ShowListGames = () => {
  return(
    <Dialog.Trigger>
      <div className='w-72 rounded bg-nlw-gradient my-4 p-1 mt-8 text-center text-lg text-white'>
        <div className=' bg-[#2A2634] p-1'>
          <h1 className='font-black/90 hover:underline text-lg' >Ver mais...</h1>
        </div>
      </div>
    </Dialog.Trigger>
  );
}