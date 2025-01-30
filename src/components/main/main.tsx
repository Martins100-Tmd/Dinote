import { usePageControllerStore } from '../state/note';
import PageInterface from './Page/pageInterface';
import Note from './note/notesect';
import { useEffect, useState } from 'react';
import { FormImg } from '../..';
import { useQuery } from '@tanstack/react-query';
import { SearchPagesQuery } from '../../utils/fetch';
import { PageCurrentId, PageStore } from '../state/page';

const NoteMainComponent = function () {
   let [state, setstate, setsearch] = usePageControllerStore((state: any) => [state.slide, state.setSlide, state.setSearch]);
   const newPage = PageStore((s) => s.newPage);
   const search = usePageControllerStore((s) => s.search);
   let [inpText, setInpText] = useState('');
   let [Data, setData] = useState([]);
   let [searchData, setSearchData] = useState([]);

   const allPageQuery = useQuery({
      queryKey: ['searchPages', 'QueryPages'],
      queryFn: () => SearchPagesQuery(),
      enabled: false,
   });

   useEffect(() => {
      let data: any = Data.filter((item: any) => {
         return item.title.includes(inpText) || item.content.includes(inpText);
      }).map((item: any) => {
         return { title: item.title, text: item.content, id: item.id };
      });
      setSearchData(data);
   }, [inpText]);

   let setPageId = PageCurrentId((s) => s.setPageId);
   return (
      <>
         <section
            className={`${
               search ? 'flex' : 'hidden'
            } fixed inset-0 z-50 w-full min-h-screen bg-[#000]/60 backdrop-blur-[1.5px] flex justify-center`}
         >
            <div className='rounded-lg shadow-lg bg-[#242424] p-3 sm:w-3/5 w-[90%] h-[65%] sm:h-[80%] m-auto'>
               <div className='w-full flex flex-row items-center justify-between py-3 border-b border-stone-950'>
                  <div className='flex flex-row items-center gap-3 w-[85%]'>
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
                        className='lucide lucide-search text-stone-300/80 self-center'
                     >
                        <circle cx='11' cy='11' r='8' />
                        <path d='m21 21-4.3-4.3' />
                     </svg>
                     <input
                        onClick={() => {
                           allPageQuery.refetch();
                           setData(allPageQuery.data.data);
                        }}
                        onChange={(e) => setInpText(e.target.value)}
                        type='text'
                        placeholder='Search Page'
                        className='bg-transparent p-2 outline-none border-none font-play sm:text-sm text-xs font-medium text-stone-300/80 w-full'
                     />
                  </div>
                  <div
                     onClick={setsearch}
                     className='w-[2.5rem] cursor-pointer h-[1.3rem] self-center rounded-lg flex justify-center bg-transparent/70 shadow-lg'
                  >
                     <p className='font-play text-[10px] text-center self-center font-semibold text-[#fff]/80'>ESC</p>
                  </div>
               </div>
               <div className='flex flex-col items-start w-full gap-3 max-h-full overflow-y-scroll'>
                  {inpText.length > 0 &&
                     searchData.map((item: any) => {
                        return (
                           <div
                              onClick={() => {
                                 setPageId(item.id ?? '');
                                 setsearch();
                              }}
                              className='w-full flex flex-col items-start gap-1 hover:bg-[#2b2b2b] p-2'
                              key={item.id}
                           >
                              <p className='font-semibold text-start font-play text-white/80 w-full text-xs'>{item.title}</p>
                              <p className='font-medium text-start font-play text-white/60 w-full text-xs'>
                                 {item.text.substring(0, 100)}...
                              </p>
                           </div>
                        );
                     })}
               </div>
            </div>
         </section>
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
      </>
   );
};

export default NoteMainComponent;
