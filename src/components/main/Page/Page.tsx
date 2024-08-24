import { useContext } from 'react';
import PageListContainer from './pagelist';
import { PageContext } from '../../state/pageContext';
const NotePage = function () {
   let { setNewPage } = useContext(PageContext);
   return (
      <section className='flex flex-col items-start w-full border-r border-[#2b2b2b] p-2 justify-between h-full'>
         <section className='flex flex-col gap-2 items-start w-full'>
            <PageListContainer />
         </section>
         <section className='justify-end flex'>
            <div onClick={setNewPage} className='flex flex-row items-center cursor-pointer'>
               <i className='material-icons text-4xl text-emerald-200 font-thin'>add</i>
               <p className='font-sans text-base text-left text-emerald-100 font-semibold'>Add Page</p>
            </div>
         </section>
      </section>
   );
};

export default NotePage;
