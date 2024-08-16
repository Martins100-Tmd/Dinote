import { NoteHeadFn } from './notehead';
import NoteListFn from './notelist';
import { useStore, useStoreII } from '../../state/note';
import NoteLayout from '../Layout';
import AddNoteSection from './addnote';

const Note = function ({ width }: { width: boolean }) {
   let noteDrop = useStore((state: any) => state.action);
   let [_, setNoteState] = useStoreII((s: any) => [s.addnote, s.setAddNote]);

   return (
      <section
         id='notes'
         className={`${
            width ? 'left-0 w-[40%]' : '-left-full w-[0%]'
         } flex flex-col items-center justify-between border-r relative duration-200 ease-linear bg-[#333333] border-x border-[#252525] h-full`}
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
                  <p className='text-4xl text-emerald-100 self-start -mt-2.5'>&#43;</p>
                  <p className='text-lg font-redit font-normal text-emerald-100 self-start'>Add Notebook</p>
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
