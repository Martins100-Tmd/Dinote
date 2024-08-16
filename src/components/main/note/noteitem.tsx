import { useState } from 'react';

export default function NoteItem({ item }: any) {
   let [state, setstate] = useState(false);
   return (
      <div
         onContextMenu={() => {
            setstate(!state), console.log(item.id);
         }}
         className='flex flex-row items-center justify-start relative w-full gap-4 hover:bg-[#5e5e5e] p-2'
      >
         <div
            className={`${
               state ? 'flex' : 'hidden'
            } flex-col items-center w-[65%] top-[25%] justify-center bg-[#4e4e4e] right-0 absolute shadow z-50 p-2`}
         >
            <div onClick={() => setstate(!state)} className='flex justify-end w-full'>
               <i className='material-icons text-xl text-slate-200'>close</i>
            </div>
            <div
               onClick={() => {
                  setstate(!state);
                  console.log(item.id);
               }}
               className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'
            >
               <i className='material-icons text-3xl text-red-900'>close</i>
               <p className='font-sans text-lg text-white'>Delete Notebooks</p>
            </div>
            <div
               onClick={() => {
                  setstate(!state);
                  console.log(item.id);
               }}
               className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'
            >
               <i className='material-icons text-3xl text-emerald-700'>drive_file_rename_outline</i>
               <p className='font-sans text-lg text-white'>Rename Notebook</p>
            </div>
         </div>

         <i className='material-icons text-3xl self-center'>library_books</i>
         <p className='font-redit text-lg font-thin text-white w-full'>{item.title}</p>
      </div>
   );
}
