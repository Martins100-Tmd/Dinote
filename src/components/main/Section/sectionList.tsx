import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { delSection } from './op';

export default function SectionList({ item, fn }: any) {
   const queryClient = useQueryClient();
   let [menu, setmenu] = useState(false);
   let [sig, setsig] = useState(2);

   let currsection = localStorage.getItem('sectpageid') ?? '';

   useEffect(() => console.log(currsection), [currsection, sig]);

   const delSectMutation = useMutation({
      mutationFn: (id: string) => delSection(id),
      mutationKey: ['delSection'],
      onSuccess: async () => {
         setmenu(!menu), await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
      },
      onError(error) {
         console.log(error);
      },
   });

   return (
      <div
         onContextMenu={() => setmenu(!menu)}
         onClick={() => {
            localStorage.setItem('sectpageid', item.id);
            setsig(Math.floor(Math.random() * 1000));
         }}
         className='flex cursor-pointer flex-row items-center justify-start p-3 w-full hover:bg-[#636363] relative'
      >
         <i className={`text-${fn()} text-xs material-icons opacity-40 self-center mr-3`}></i>
         <p className='font-redit text-slate-100 font-medium self-center text-base'>{item.title}</p>
         <div
            className={`${
               menu ? 'flex' : 'hidden'
            } flex-col items-center  absolute p-2 shadow-xl gap-3 w-[135%] top-[35%] -right-[40%] bg-[#4e4e4e] z-50`}
         >
            <div onClick={() => setmenu(!menu)} className='flex justify-end w-full cursor-pointer'>
               <i className='material-icons text-xl text-slate-200'>close</i>
            </div>
            <div onClick={() => delSectMutation.mutate(item.id)} className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'>
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
