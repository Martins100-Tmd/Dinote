import { useState } from 'react';
import { PageStore } from '../../state/page';

export default function PageItem({ item }: any) {
   let [pageMenu, setPageMenu] = useState(false);
   let setcurrPageId = PageStore((s: any) => s.setClickedPageId);
   return (
      <div
         onClick={() => setcurrPageId(item.id)}
         className='relative flex flex-row w-full items-center justify-between px-4 py-2 border-l-4 border-emerald-700 rounded-l-md'
      >
         <p className='outline-none border-none font-redit text-slate-100 font-medium self-center'>{item.title}</p>
         <i onClick={() => setPageMenu(!pageMenu)} className='material-icons text-xl cursor-pointer self-center text-slate-100 text-end'>
            more_horiz
         </i>
         <div className={`w-[70%] absolute bg-[#686868] right-0 shadow-2xl rounded p-2 ${pageMenu ? 'flex' : 'hidden'}`}>
            <ul className='w-full flex flex-col items-stretch justify-center'>
               <li className='text-center font-raj'>Delete page</li>
            </ul>
         </div>
      </div>
   );
}
