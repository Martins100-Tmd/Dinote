import { useStore } from '../state/note';
import { PageStore } from '../state/page';
import PageInit from './Page/PageInit';
import Note from './note/notesect';
import { useEffect } from 'react';

const NoteMainComponent = function () {
   let [state, setstate] = useStore((state: any) => [state.slide, state.setSlide]);
   let PageId = PageStore((s: any) => s.clickedPageId);

   useEffect(() => {
      function formatDate(date: any) {
         const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
         return date.toLocaleDateString('en-US', options);
      }

      const now = new Date();
      const formattedDate = formatDate(now).replace('day', '');
      console.log(formattedDate);
   }, []);

   return (
      <section className='flex flex-row items-center w-full h-screen min-h-full relative bg-[#333333]'>
         <section className={`flex flex-col items-center p-5 bg-[#424242] shadow h-full`}>
            <div className='flex justify-center mb-7' onClick={() => setstate()}>
               <span className='material-icons opacity-65 text-slate-50 cursor-pointer'>menu_book</span>
            </div>
            <div className='flex justify-center mb-7'>
               <span className='material-icons opacity-65 text-slate-50 cursor-pointer'>search</span>
            </div>
            <div className='flex justify-center'>
               <span className='material-icons opacity-65 text-slate-50 cursor-pointer'>schedule</span>
            </div>
         </section>
         <Note width={state} />
         <PageInit id={PageId} />
      </section>
   );
};

export default NoteMainComponent;
