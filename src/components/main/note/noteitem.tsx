import { useState } from 'react';
import { delNote } from './op';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { usePageControllerStore } from '../../state/note';
import { useNoteIdStore } from '../../state/note';
import { Pencil, Trash2 } from 'lucide-react';

export default function NoteItem({ item }: any) {
   const queryClient = useQueryClient();
   let [state, setstate] = useState(false);
   let navigate = useNavigate();
   let setNoteDrop = usePageControllerStore((state: any) => state.setAction);
   let setCurrentNoteId = useNoteIdStore((s) => s.setCurrentNoteId);

   const delNoteMutation = useMutation({
      mutationFn: (id: string) => delNote(id),
      mutationKey: ['deleteNote'],
      onSuccess: async (data) => {
         if (data && data.message == 'Token is not valid') navigate('/'), await queryClient.invalidateQueries({ queryKey: ['fetchNotes'] });
      },
      onError(err) {
         throw err;
      },
   });

   return (
      <div
         onContextMenu={() => setstate(!state)}
         onClick={(event: any) => {
            setNoteDrop();
            event.stopPropagation(), setCurrentNoteId(item.id);
            setCurrentNoteId(item.id);
         }}
         className='flex flex-row items-center cursor-pointer justify-start relative w-full gap-4 hover:bg-[#5e5e5e] p-2'
      >
         <button
            id='popmenu'
            className={`w-[50%] rounded-2xl top-[40%] absolute left-[40%] sm:-right-[30%] shadow-2xl z-20 bg-[#2f2f2f] ${
               state ? 'flex flex-col justify-end' : 'hidden'
            }`}
         >
            <div className='w-screen min-h-screen fixed z-10 inset-0' onClick={() => setstate(!state)}></div>
            <ul className='w-full flex flex-col items-stretch justify-center z-20 border-[0.1px] border-opacity-20 border-gray-100 gap-3 py-4 bg-[#2f2f2f] rounded-2xl'>
               <li
                  onClick={(e) => {
                     e.stopPropagation();
                     setstate(!state);
                     delNoteMutation.mutate(item.id, {
                        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['fetchNotes'] }),
                     });
                  }}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <Trash2 className='text-red-600 self-center' size={'1.1rem'} />
                  <span className='font-san text-base font-medium text-red-600 self-center'>Delete</span>
               </li>
               <li
                  onClick={(e) => {
                     e.stopPropagation(), setstate(false);
                  }}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <Pencil className='text-lg text-slate-50 self-center' size={'1.1rem'} />
                  <span className='font-raj text-sm font-medium text-gray-100 self-center'>Rename page</span>
               </li>
            </ul>
         </button>
         <i className='material-icons text-xl self-center text-gray-200 opacity-65'>library_books</i>
         <p className='font-sand text-sm font-thin text-white w-full'>{item.title}</p>
      </div>
   );
}
