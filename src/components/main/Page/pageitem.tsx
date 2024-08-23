import { useRef, useState } from 'react';
import { PageStore } from '../../state/page';
import { backendAPI } from '../../../index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PageItem({ item }: any) {
   let [pageMenu, setPageMenu] = useState(false);
   const queryClient = useQueryClient();
   let setcurrPageId = PageStore((s: any) => s.setClickedPageId);

   let ref = useRef(null);

   const DelMutation = useMutation({
      mutationFn: (id: string) => deletePage(id),
      mutationKey: ['delPage'],
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         setPageMenu(!pageMenu);
      },
   });

   return (
      <div
         onClick={() => {
            console.log(item.id), setcurrPageId(item['id']);
         }}
         className='relative flex flex-row w-full hover:bg-[#535353] items-center justify-between px-4 py-2 border-l-4 border-emerald-700 rounded-l-md'
      >
         <p className='outline-none border-none font-redit text-slate-100 font-medium self-center'>{item.title}</p>
         <i onClick={() => setPageMenu(!pageMenu)} className='material-icons text-xl cursor-pointer self-center text-slate-100 text-end'>
            more_horiz
         </i>
         <div ref={ref} className={`w-full top-[40%] absolute bg-[#535353] -right-[30%] shadow-2xl z-50 ${pageMenu ? 'flex' : 'hidden'}`}>
            <ul className='w-full flex flex-col items-stretch justify-center gap-6 py-5'>
               <li
                  onClick={() => DelMutation.mutate(item.id)}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <i className='material-icons text-2xl text-slate-50 self-center'>close</i>
                  <span className='font-raj text-lg font-medium text-slate-100 self-center'>Delete page</span>
               </li>
               <li className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'>
                  <i className='material-icons text-2xl text-slate-50 self-center'>drive_file_rename_outline</i>
                  <span className='font-raj text-lg font-medium text-slate-100 self-center'>Rename page</span>
               </li>
            </ul>
         </div>
      </div>
   );
}

async function deletePage(id: string) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'delete/onepage/' + id, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
}
