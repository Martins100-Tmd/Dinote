import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import NoteItem from './noteitem';
import LoadingNoteList from './loadingnote';
import { IDstore } from '../../state/sectnpage';

async function fetchNotes() {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/userwithnote', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}
export default function NoteListFn() {
   let setCurrNoteId = IDstore((s: any) => s.setCurrNoteId);
   const noteQuery = useQuery({ queryKey: ['fetchNotes'], queryFn: () => fetchNotes() });

   if (noteQuery.isLoading) return <LoadingNoteList />;
   if (noteQuery.isError) return <>{noteQuery.error.message}</>;
   if (noteQuery.isSuccess) {
      setCurrNoteId(noteQuery.data.getNotes[0].id ?? '');
      return (
         <section className='grid grid-cols-1 items-start w-full gap-4'>
            {noteQuery.data.getNotes.map((item: any, index: number) => {
               return (
                  <div key={index}>
                     <NoteItem item={item} />
                  </div>
               );
            })}
         </section>
      );
   }
}
