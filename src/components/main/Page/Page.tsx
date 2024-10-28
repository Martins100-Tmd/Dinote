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
         <section className='justify-end flex'>
            <div
               onClick={() => {
                  setPageId(''), setNewPage(false), setTimeout(() => setNewPage(true), 100), setstate();
               }}
               id='newPAGE'
               className='flex flex-row items-center cursor-pointer bg-red'
            >
               <i id='newPAGE' className='material-icons text-2xl text-emerald-200  font-thin'>
                  add
               </i>
               <p id='newPAGE' className='text-sm text-left font-sand text-emerald-100 font-medium'>
                  Add Page
               </p>
            </div>
         </section>
      </section>
   );
};

export default NotePage;
