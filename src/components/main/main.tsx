import { useStore } from '../state/note';
import { PageContext } from '../state/pageContext';
import PageInterface from './Page/pageInterface';
import Note from './note/notesect';
import { useContext } from 'react';

const NoteMainComponent = function () {
   let [state, setstate] = useStore((state: any) => [state.slide, state.setSlide]);
   let {
      notePageState: { newPage },
   } = useContext(PageContext);

   return (
      <section className='flex flex-row items-center w-full h-screen min-h-full relative bg-[#333333]'>
         <section className={`flex flex-col items-center p-2.5 sm:p-5 bg-[#424242] shadow h-full`}>
            <div className='flex justify-center mb-7' onClick={() => setstate()}>
               <span className='material-icons text-xl sm:text-2xl opacity-65 text-slate-50 cursor-pointer'>menu_book</span>
            </div>
            <div className='flex justify-center mb-7'>
               <span className='material-icons text-xl sm:text-2xl opacity-65 text-slate-50 cursor-pointer'>search</span>
            </div>
            <div className='flex justify-center'>
               <span className='material-icons text-xl sm:text-2xl opacity-65 text-slate-50 cursor-pointer'>schedule</span>
            </div>
         </section>
         <Note width={state} />
         <PageInterface init={newPage} />
      </section>
   );
};

export default NoteMainComponent;
