import PostPage from './PostPage.tsx';
import PutPage from './PutPage.tsx';
import { PageCurrentId, PageIdState } from '../../state/page.ts';
import React from 'react';

export default function PageInterface({ init }: { init: boolean }) {
   let pageId = PageCurrentId((s: PageIdState) => s.pageId);
   return init ? <PostPage /> : pageId ? <PutPage pageId={pageId} /> : <NoPage />;
}

function NoPage() {
   return (
      <section className='w-full h-full bg-[#2c2c2c] flex justify-center p-3 sm:p-10 sm:-ml-2 bg-opacity-90'>
         <section className='flex flex-col items-center w-auto mx-auto self-center'>
            <p className='font-afa text-sm sm:text-2xl font-semibold text-center text-white'>There aren't any page here.</p>
            <p className='font-afa text-sm sm:text-base font-medium text-center text-white'>Add a page to start taking notes</p>
         </section>
      </section>
   );
}
