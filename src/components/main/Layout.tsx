import NoteSection from './Section/section';
import NotePage from './Page/Page';
import { useContext, useEffect, useState } from 'react';
import createNoteState from '../state/context';

const NoteLayout = function () {
   let {
      state: { noteObj },
   } = useContext(createNoteState);
   let [id, setId] = useState('');

   useEffect(() => {
      if (noteObj) setId(noteObj.id);
   }, [noteObj]);

   return (
      <section className='flex flex-row w-full h-[93%]'>
         <NoteSection id={id} />
         <NotePage id={''} />
      </section>
   );
};
export default NoteLayout;
