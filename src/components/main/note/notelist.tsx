import { useQuery } from '@tanstack/react-query';
import NoteItem from './noteitem';
import LoadingNoteList from './loadingnote';
import { useEffect, useState } from 'react';
import { fetchNotes } from './op';
import { useNoteIdStore, useNoteObjectStore } from '../../state/note';

export default function NoteListFn() {
   const noteQuery = useQuery({ queryKey: ['fetchNotes'], queryFn: fetchNotes, refetchOnMount: 'always' });
   let [noteData, setNoteData] = useState<any[]>([]);
   let currentnoteid = useNoteIdStore((s) => s.currentnoteid);
   const [noteObj, noteObjFn, signal, setSignal, setUsername] = useNoteObjectStore((s) => [
      s.noteObj,
      s.noteObjectUpdate,
      s.signal,
      s.setSignal,
      s.setUsername,
   ]);

   const getCurrNote = (list: any[], id: string) => noteObjFn(list.find((item) => item.id === id));

   useEffect(() => {
      if (noteQuery.isSuccess && noteQuery.data && noteQuery.data['getUserWithNote']) setNoteData(noteQuery.data.getUserWithNote.notes);
   }, [noteObj, signal]);

   useEffect(() => {
      if (noteQuery.isSuccess && noteQuery.data) {
         if (!!noteQuery.data['getUserWithNote']) setNoteData(noteQuery.data.getUserWithNote.notes);
         getCurrNote(noteData, currentnoteid);
         noteObjFn(noteData[0]);
         setSignal();
         if (noteQuery.data.getUserWithNote.username) setUsername(noteQuery.data.getUserWithNote.username);
      }
   }, [noteQuery.status, noteQuery.data, currentnoteid, noteData]);

   useEffect(() => {
      getCurrNote(noteData, currentnoteid);
   }, [currentnoteid, noteQuery.data]);

   if (noteQuery.isLoading) return <LoadingNoteList />;

   if (noteQuery.isError) return <>{noteQuery.error.message}</>;

   if (noteData.length > 0 && noteData.map) {
      return (
         <section className='grid grid-cols-1 items-start w-full gap-4'>
            {noteData.map((item: any, index: number) => {
               let id = noteObj ? noteObj['id'] : '';
               if (id !== item['id']) {
                  return (
                     <div key={index}>
                        <NoteItem item={item} />
                     </div>
                  );
               }
            })}
         </section>
      );
   }
}
