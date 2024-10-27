import { Pencil, Trash2 } from 'lucide-react';

interface MenuInt {
   Switch: boolean;
   setswitch: (res: boolean) => void;
   DelAction: {
      mutate: (id: string) => void;
   };
   id: string;
   setrename: (res: boolean) => void;
}

export default function PopUpMenu({ Switch, setswitch, setrename, id, DelAction }: MenuInt) {
   return (
      <button
         id='popmenu'
         className={`w-full top-[40%] absolute -right-[30%] shadow-2xl z-20 bg-[#2f2f2f] ${
            Switch ? 'flex flex-col justify-end' : 'hidden'
         }`}
      >
         <div className='w-screen min-h-screen fixed z-10 inset-0' onClick={() => setswitch(false)}></div>
         <ul className='w-full flex flex-col items-stretch justify-center z-20 border-[0.1px] border-opacity-20 border-gray-100 gap-3 py-4 bg-[#2f2f2f] rounded-2xl'>
            <li
               onClick={() => DelAction.mutate(id)}
               className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
            >
               <Trash2 className='text-red-600 self-center' size={'1.1rem'} />
               <span className='font-san text-base font-medium text-red-600 self-center'>Delete</span>
            </li>
            <li
               onClick={() => {
                  setrename(true), setswitch(false);
               }}
               className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
            >
               <Pencil className='text-lg text-slate-50 self-center' size={'1.1rem'} />
               <span className='font-raj text-sm font-medium text-gray-100 self-center'>Rename page</span>
            </li>
         </ul>
      </button>
   );
}
