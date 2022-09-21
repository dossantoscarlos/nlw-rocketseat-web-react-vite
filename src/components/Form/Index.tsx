import { ButtonHTMLAttributes, HtmlHTMLAttributes, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props:InputProps){
 return (
  <input 
    {...props}
    className='bg-zinc-900  p-2 rounded text-sm
    placeholder:text-zinc-500 text-white placeholder:text-xs'
  />
 )
} 

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button (props:Props) {
  return (
    <button 
      {...props}
      className='bg-black/70 h-8 w-6 hover:bg-violet-600/50 '
      >
      {props.title}
    </button>);
} 