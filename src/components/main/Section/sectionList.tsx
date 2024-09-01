import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { delSection } from './op';
import sectionContext from '../../state/sectContext';
import { updSectionName } from './op';

export default function SectionList({ item }: any) {
   const queryClient = useQueryClient();
   let [menu, setmenu] = useState(false);
   let [secText, setSecText] = useState(item.title);
   let [rename, setrename] = useState(false);
   let { setCurrSection } = useContext(sectionContext);

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
   const PutMutation = useMutation({
      mutationFn: (title: string) => updSectionName(item.id, { title }),
      mutationKey: ['updatePageName'],
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
         setmenu(!menu), setrename(false);
      },
   });
   return (
      <div
         onContextMenu={() => setmenu(!menu)}
         onClick={() => {
            localStorage.setItem('sectpageid', item.id);
            setCurrSection(localStorage.getItem('sectpageid') ?? '');
         }}
         className='flex cursor-pointer flex-row items-center justify-start p-3 w-full hover:bg-[#636363] relative'
      >
         <>
            {rename ? (
               <>
                  <input
                     value={secText}
                     type='text'
                     onChange={(e) => {
                        let target = e.target as HTMLInputElement;
                        setSecText(target.value);
                     }}
                     onBlur={() => {
                        setrename(false);
                        PutMutation.mutate(secText);
                     }}
                     className='w-full font-raj text-sm text-white bg-transparent h-full outline-none border p-1 border-[#c4c4c4]'
                     autoFocus
                  />
                  <i onClick={() => setrename(false)} className='cursor-pointer material-icons text-xl text-slate-50 self-center'>
                     close
                  </i>
               </>
            ) : (
               <p className='font-redit text-slate-100 font-medium self-center text-base'>{item.title}</p>
            )}
         </>
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
            <div
               onClick={() => {
                  setmenu(false);
                  setrename(true);
               }}
               className='flex flex-row items-start gap-3 w-full p-3 cursor-pointer'
            >
               <i className='material-icons text-3xl text-emerald-700'>drive_file_rename_outline</i>
               <p className='font-sans text-lg text-white'>Rename Section</p>
            </div>
         </div>
      </div>
   );
}
