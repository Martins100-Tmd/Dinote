import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import NoteItem from './noteitem';
import LoadingNoteList from './loadingnote';
import { storeB } from '../../state/sectnpage';
import { useContext, useEffect, useState } from 'react';
import createNoteState from '../../state/context';

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
   const noteQuery = useQuery({ queryKey: ['fetchNotes'], queryFn: fetchNotes, refetchOnMount: 'always' });
   let [noteData, setNoteData] = useState<any[]>([]);
   let currnoteid = storeB((s: any) => s.currNoteId);
   let {
      state: { noteObj, signal },
      noteObjFn,
      setstate,
   } = useContext(createNoteState);

   const getCurrNote = (list: any[], id: string) => noteObjFn(list.find((item) => item.id === id));

   useEffect(() => {
      if (noteQuery.isSuccess && noteQuery.data && noteQuery.data['getUserWithNote']) setNoteData(noteQuery.data.getUserWithNote.notes);
   }, [noteObj, signal]);

   useEffect(() => {
      if (noteQuery.isSuccess && noteQuery.data) {
         if (!!noteQuery.data['getUserWithNote']) setNoteData(noteQuery.data.getUserWithNote.notes);
         console.log(noteQuery.data);
         getCurrNote(noteData, currnoteid);
         noteObjFn(noteData[0]);
         setstate((s: any) => ({
            ...s,
            signal: !signal,
            username: !!noteQuery.data['getUserWithNote'] ? noteQuery.data.getUserWithNote.username : '',
         }));
      }
   }, [noteQuery.status, noteQuery.data, currnoteid, noteData]);

   useEffect(() => {
      getCurrNote(noteData, currnoteid);
   }, [currnoteid, noteQuery.data]);

   if (noteQuery.isLoading) return <LoadingNoteList />;
   if (noteQuery.isError) return <>{noteQuery.error.message}</>;

   return (
      <section className='grid grid-cols-1 items-start w-full gap-4'>
         {noteData.length > 0 &&
            noteData.map &&
            noteData.map((item: any, index: number) => {
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
