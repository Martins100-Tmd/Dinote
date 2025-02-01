import PageListContainer from './pagelist';
import { usePageControllerStore } from '../../state/note';
import { PageCurrentId, PageStore } from '../../state/page';
import { useEffect } from 'react';
const NotePage = function () {
   const [newPage, setNewPage] = PageStore((s) => [s.newPage, s.setNewPage]);
   const setPageId = PageCurrentId((s) => s.setPageId);
   const setState = usePageControllerStore((state: any) => state.setSlide);

   const allFunction = function () {
      setPageId(''), setState(), setNewPage(true);
   };

   useEffect(() => {
      console.log(newPage, 'LLLLLLL');
   }, [newPage]);

   return (
      <section className='flex flex-col items-start w-full border-r border-[#2b2b2b] justify-between h-full'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <PageListContainer />
         </section>
         <section className='justify-center flex sticky bottom-0 items-center bg-[#262626] w-full p-2'>
            <div onClick={allFunction} id='newPAGE' className='flex flex-row items-center cursor-pointer bg-red'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17'
                  height='17'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-plus text-white/80 self-center'
               >
                  <path d='M5 12h14' />
                  <path d='M12 5v14' />
               </svg>
               <p className='font-sand text-[12px] font-medium self-end text-left text-white/80'>Add Page</p>
            </div>
         </section>
      </section>
   );
};

export default NotePage;
