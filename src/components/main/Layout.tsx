import NoteSection from './Section/section';
import NotePage from './Page/Page';
import { useContext, useEffect, useState } from 'react';
import createNoteState from '../state/context';
import { NoteStore, NoteStoreState } from '../state/_note';

const NoteLayout = function () {
   let noteid = NoteStore((s: NoteStoreState) => s.currNoteId);
   return (
      <section className='flex flex-row w-full h-[93%] bg-[rgba(54,54,54,0.9)]'>
         <NoteSection id={noteid} />
         <NotePage />
      </section>
   );
};
export default NoteLayout;
