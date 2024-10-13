import { useState } from 'react';
import { storeB } from '../../state/sectnpage';
import { delNote } from './op';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../state/note';

export default function NoteItem({ item }: any) {
   const queryClient = useQueryClient();
   let [state, setstate] = useState(false);
   let [_, setCurrNoteId] = storeB((s: any) => [s.currNoteId, s.setCurrNoteId]);
   let navigate = useNavigate();
   let [__, setNoteDrop] = useStore((state: any) => [state.action, state.setAction]);

   const delNoteMutation = useMutation({
      mutationFn: (id: string) => delNote(id),
      mutationKey: ['deleteNote'],
      onSuccess: async (data) => {
         if (data && data.message == 'Token is not valid') navigate('/'), await queryClient.invalidateQueries({ queryKey: ['fetchNotes'] });
      },
      onError(err) {
         console.log(err);
      },
   });

   return (
      <div
         onContextMenu={() => setstate(!state)}
         onClick={(event: any) => {
            setNoteDrop();
            event.stopPropagation(), setCurrNoteId(item.id);
         }}
         className='flex flex-row items-center cursor-pointer justify-start relative w-full gap-4 hover:bg-[#5e5e5e] p-2'
      >
         <div
            className={`${
               state ? 'flex' : 'hidden'
            } flex-col items-center w-[65%] top-[25%] justify-center bg-[#4e4e4e] right-0 absolute shadow z-50 p-2`}
         >
            <div onClick={() => setstate(!state)} className='flex justify-end w-full cursor-pointer'>
               <i className='material-icons text-lg text-slate-200'>close</i>
            </div>
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  setstate(!state);
                  delNoteMutation.mutate(item.id, {
                     onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['fetchNotes'] }),
                  });
               }}
               className='flex flex-row items-start gap-3 w-full p-2 cursor-pointer hover:bg-[#6f6f6f]'
            >
               <i className='material-icons text-2xl text-red-900'>close</i>
               <p className='font-sand text-base text-white'>Delete Notebooks</p>
            </div>
            <div
               onClick={(e) => {
                  e.stopPropagation();
                  setstate(!state);
               }}
               className='flex flex-row items-start gap-3 w-full p-2 cursor-pointer hover:bg-[#6f6f6f]'
            >
               <i className='material-icons text-2xl text-gray-700'>drive_file_rename_outline</i>
               <p className='font-sand text-base text-white'>Star Notebook</p>
            </div>
         </div>
         <i className='material-icons text-xl self-center text-gray-200 opacity-65'>library_books</i>
         <p className='font-sand text-sm font-thin text-white w-full'>{item.title}</p>
      </div>
   );
}
