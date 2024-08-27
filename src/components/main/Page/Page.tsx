import { useContext, useEffect } from 'react';
import { PageContext } from '../../state/pageContext';
import PageListContainer from './pagelist';
const NotePage = function () {
   let {
      setNewPage,
      setPageId,
      notePageState: { newPage },
   } = useContext(PageContext);
   useEffect(() => console.log(newPage), [newPage]);

   return (
      <section className='flex flex-col items-start w-full border-r border-[#2b2b2b] p-2 justify-between h-full'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <PageListContainer />
         </section>
         <section className='justify-end flex'>
            <div
               onClick={() => {
                  setPageId(''), setNewPage(true);
               }}
               id='newPAGE'
               className='flex flex-row items-center cursor-pointer bg-red'
            >
               <i id='newPAGE' className='material-icons text-4xl text-emerald-200 font-thin'>
                  add
               </i>
               <p id='newPAGE' className='font-sans text-base text-left text-emerald-100 font-semibold'>
                  Add Page
               </p>
            </div>
         </section>
      </section>
   );
};

export default NotePage;
