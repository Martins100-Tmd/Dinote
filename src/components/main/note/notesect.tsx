import { NoteHeadFn } from './notehead';
import NoteListFn from './notelist';
import { useStore, useStoreII } from '../../state/note';
import NoteLayout from '../Layout';
import AddNoteSection from './addnote';
import { Plus } from 'lucide-react';

const Note = function ({ width }: { width: boolean }) {
   let noteDrop = useStore((state: any) => state.action);
   let [_, setNoteState] = useStoreII((s: any) => [s.addnote, s.setAddNote]);

   return (
      <section
         id='notes'
         className={`${
            width ? 'left-0 sm:w-1/2 w-full sm:z-0 z-50' : '-left-full w-[0%]'
         } flex flex-col items-center justify-between border-r absolute sm:relative bg-[#333333] border-x border-[#252525] h-full`}
      >
         <NoteHeadFn />
         <section className='flex flex-col items-center w-full relative h-[98%]'>
            <section
               className={`${
                  noteDrop == 'expand_less' ? 'absolute z-30 h-[92%] top-0' : '-top-[110%]'
               } flex flex-col items-center w-full justify-start absolute bg-[#424242] gap-5`}
            >
               <NoteListFn />
               <AddNoteSection />
               <div onClick={() => setNoteState()} className='flex flex-row items-start w-auto justify-start p-2 gap-2 cursor-pointer'>
                  <Plus className='text-emerald-100 self-center' size={'1rem'} />
                  <p className='text-sm font-sand font-medium text-emerald-100 self-center'>Add Notebook</p>
               </div>
            </section>
            <section className='w-full h-[98%]'>
               <NoteLayout />
            </section>
            <section className='flex'></section>
         </section>
      </section>
   );
};

export default Note;
