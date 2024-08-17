import { useEffect, useState } from 'react';

export default function SectionList({ item, fn }: { item: any; fn: Function }) {
   let [menu, setmenu] = useState(false);
   useEffect(() => {
      console.log(item.title);
   }, []);
   return (
      <div onContextMenu={() => setmenu(!menu)} className='flex flex-row items-center justify-start p-2 w-full hover:bg-[#636363] relative'>
         {/* <i className={`text-${fn()} material-icons opacity-40 self-center mr-3`}>double_arrow</i> */}
         <p className='font-redit text-slate-100 font-medium self-center text-base'>{item.title}</p>
         <div
            className={`${
               menu ? 'flex' : 'hidden'
            } flex-col items-center  absolute p-2 shadow-xl gap-3 w-[135%] top-[35%] -right-[40%] bg-[#4e4e4e] z-50`}
         >
            <div onClick={() => setmenu(!menu)} className='flex justify-end w-full cursor-pointer'>
               <i className='material-icons text-xl text-slate-200'>close</i>
            </div>
            <div onClick={() => console.log(item.id)} className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'>
               <i className='material-icons text-3xl text-emerald-700'>close</i>
               <p className='font-sans text-lg text-white'>Delete Section</p>
            </div>
            <div onClick={() => console.log(item.id)} className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'>
               <i className='material-icons text-3xl text-emerald-700'>drive_file_rename_outline</i>
               <p className='font-sans text-lg text-white'>Rename Section</p>
            </div>
         </div>
      </div>
   );
}
