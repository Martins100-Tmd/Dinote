import { useContext } from 'react';
import { PageContext } from '../../state/pageContext';
import PageListContainer from './pagelist';
import { useStore } from '../../state/note';
const NotePage = function () {
   let { setNewPage, setPageId } = useContext(PageContext);
   let setstate = useStore((state: any) => state.setSlide);

   return (
      <section className='flex flex-col items-start w-full border-r border-[#2b2b2b] p-2 justify-between h-full'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <PageListContainer />
         </section>
         <section className='justify-end flex sticky bottom-0'>
            <div
               onClick={() => {
                  setPageId(''), setNewPage(false), setTimeout(() => setNewPage(true), 100), setstate();
               }}
               id='newPAGE'
               className='flex flex-row items-center cursor-pointer bg-red'
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-plus text-indigo-300 self-center'
               >
                  <path d='M5 12h14' />
                  <path d='M12 5v14' />
               </svg>
               <p id='newPAGE' className='text-sm text-left font-play text-indigo-200 font-medium'>
                  Add Page
               </p>
            </div>
         </section>
      </section>
   );
};

export default NotePage;
