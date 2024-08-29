import { useContext } from 'react';
import { PageContext } from '../../state/pageContext';
import PostPage from './PostPage';
import PutPage from './PutPage';

export default function PageInterface({ init }: { init: boolean }) {
   let {
      notePageState: { currpageid },
   } = useContext(PageContext);
   return init ? <PostPage /> : currpageid ? <PutPage /> : <NoPage />;
}

function NoPage() {
   return (
      <section className='w-full h-full bg-[#2c2c2c] flex justify-center p-10'>
         <section className='flex flex-col items-center w-auto mx-auto self-center'>
            <p className='text-2xl font-semibold text-center text-white'>There aren't any page here.</p>
            <p className='text-base font-medium text-center text-white'>Add a page to start taking notes</p>
         </section>
      </section>
   );
}
