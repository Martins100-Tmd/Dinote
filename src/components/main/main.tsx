import { useStore } from '../state/note';
import { PageContext } from '../state/pageContext';
import PageInterface from './Page/pageInterface';
import Note from './note/notesect';
import { useContext, useEffect } from 'react';
import { FormImg } from '../..';

const NoteMainComponent = function () {
   let [state, setstate, search, setsearch] = useStore((state: any) => [state.slide, state.setSlide, state.search, state.setSearch]);
   let {
      notePageState: { newPage },
   } = useContext(PageContext);

   useEffect(() => {
      console.log(search);
   }, [search]);
   return (
      <section className='flex flex-row items-center w-full h-screen min-h-full relative bg-[#333333]'>
         <img src={FormImg} className='object-cover w-full h-screen absolute inset-0 z-0' />
         <div className='absolute flex flex-row inset-0 w-full h-full z-30'>
            <section className={`flex flex-col items-center p-2.5 sm:p-5 bg-[#424242] shadow h-full`}>
               <div className='flex justify-center mb-7 relative group' onClick={() => setstate()}>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='20'
                     height='20'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='lucide lucide-library text-slate-50 cursor-pointer'
                  >
                     <path d='m16 6 4 14' />
                     <path d='M12 6v14' />
                     <path d='M8 8v12' />
                     <path d='M4 4v16' />
                  </svg>
                  <div
                     className='absolute top-full left-1/2 transform
                       -translate-x-1/4 mt-2 w-max px-2 py-0.5 z-40 font-play
                       text-xs bg-[#fff] rounded
                       shadow-lg opacity-0 group-hover:opacity-100'
                  >
                     Catalogue
                  </div>
               </div>
               <div onClick={setsearch} className='flex justify-center mb-7 relative group'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='20'
                     height='20'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='lucide lucide-search text-slate-50 cursor-pointer'
                  >
                     <circle cx='11' cy='11' r='8' />
                     <path d='m21 21-4.3-4.3' />
                  </svg>
                  <div
                     className='absolute top-full left-1/2 transform
                       -translate-x-1/4 mt-2 w-max px-2 py-0.5 z-40 font-play
                       text-xs bg-[#fff] rounded
                       shadow-lg opacity-0 group-hover:opacity-100'
                  >
                     Search
                  </div>
               </div>
               <div className='flex flex-col justify-center group items-center relative'>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='20'
                     height='20'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className='lucide lucide-history text-slate-50 cursor-pointer'
                  >
                     <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
                     <path d='M3 3v5h5' />
                     <path d='M12 7v5l4 2' />
                  </svg>
                  <div
                     className='absolute top-full left-1/2 transform
                       -translate-x-1/4 mt-2 w-max px-2 py-0.5 z-40 font-play
                       text-xs bg-[#fff] rounded
                       shadow-lg opacity-0 group-hover:opacity-100'
                  >
                     Recent
                  </div>
               </div>
            </section>
            <Note width={state} />
            <PageInterface init={newPage} />
         </div>
      </section>
   );
};

export default NoteMainComponent;
