import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNoteFn } from '../../../utils/fetch';
import { useStoreII } from '../../state/note';
import { FormEvent, useEffect } from 'react';

export default function AddNoteSection() {
   const queryClient = useQueryClient();
   const [notename, setnotename] = useStoreII((s: any) => [s.notename, s.setNoteName]);
   const [addnote, setaddnote] = useStoreII((s: any) => [s.addnote, s.setAddNote]);

   const addNoteMutation = useMutation({
      mutationKey: ['addNote'],
      mutationFn: (data: string) => addNoteFn({ title: data }),
      onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['fetchNotes'] }),
   });

   const setNoteFn = (e: FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      setnotename(target.value);
   };

   useEffect(() => {
      if (addNoteMutation.isSuccess) setaddnote();
   }, [addNoteMutation.status]);

   return (
      <div className={`${addnote ? 'flex' : 'hidden'} w-screen h-screen justify-center relative flex`}>
         <div className='bg-black bg-opacity-50 w-screen h-full fixed inset-0 z-0'></div>
         <div
            className={`bg-[#3b3b3b] fixed top-1/5 sm:top-1/4 w-[90%] sm:left-1/4 flex flex-col items-center sm:w-1/2 mx-auto p-7 gap-7 z-50`}
         >
            <div className='flex justify-start w-full mb-3'>
               <p className='font-play text-lg sm:text-2xl text-slate-200 font-medium'>New Notebook</p>
            </div>
            <input
               onInput={(e) => setNoteFn(e)}
               type='text'
               placeholder='Notebook name'
               className=' w-full border font-thin border-gray-300 bg-transparent text-white outline-none p-2.5 font-play text-sm sm:text-lg'
            />
            <div className='flex flex-row items-center w-full justify-between gap-5'>
               <button
                  onClick={() => addNoteMutation.mutate(notename)}
                  disabled={false}
                  className={`${
                     notename.length > 0 ? 'bg-[#646464]' : 'bg-[#3d3d3d] text-stone-500'
                  } w-full shadow p-2 sm:p-4 font-play text-center text-sm sm:text-lg
                   text-slate-100`}
               >
                  Create Notebook
               </button>
               <button
                  onClick={setaddnote}
                  className='w-full shadow p-1.5 sm:p-4 font-play text-center text-base sm:text-lg bg-[#646464] text-slate-100'
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
}
