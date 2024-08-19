import { useStore } from '../state/note';
import { PageStore } from '../state/page';
import PageInit from './Page/PageInit';
import Note from './note/notesect';
import { useEffect } from 'react';

const NoteMainComponent = function () {
   let [state, setstate] = useStore((state: any) => [state.slide, state.setSlide]);
   let newPage = PageStore((s: any) => s.newPage);

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
         <PageSect action={newPage} />
      </section>
   );
};

function PageSect({ action }: { action: boolean }) {
   if (!action) {
      return (
         <section className={`w-full bg-[#2c2c2c] h-full flex justify-center duration-100`}>
            <div className='flex justify-center flex-col'>
               <p className='text-2xl font-semibold text-center mb-10 text-slate-50'>There aren't any pages here.</p>
               <p className='text-xl font-medium text-center font-redit text-slate-200'>Add a page to start taking notes.</p>
            </div>
         </section>
      );
   } else {
      return <PageInit />;
   }
}

export default NoteMainComponent;
