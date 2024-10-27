import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PageContext } from '../../state/pageContext';
import { updPageName } from './fetch';
import { deletePage } from './fetch';
import { Trash2, Pencil } from 'lucide-react';
import { PageCurrentId, PageIdState } from '../../state/page';

export default function PageItem({ item }: any) {
   let [pageMenu, setPageMenu] = useState(false);
   let [rename, setrename] = useState(false);
   let [pageText, setPageText] = useState(item.title);

   const queryClient = useQueryClient();
   const { setNewPage } = useContext(PageContext);
   let [_, setPageId] = PageCurrentId((s: PageIdState) => [s.pageId, s.setPageId]);

   const DelMutation = useMutation({
      mutationFn: (id: string) => deletePage(id),
      mutationKey: ['delPage'],
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
         setPageMenu(false);
      },
   });
   const PutMutation = useMutation({
      mutationFn: (title: string) => updPageName(item.id, { title }),
      mutationKey: ['updatePageName'],
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
         setPageMenu(false), setrename(false);
      },
   });

   return (
      <div className='relative flex flex-row w-full items-center justify-between rounded-l-md'>
         <>
            {rename ? (
               <div className='w-full p-1'>
                  <input
                     value={pageText}
                     type='text'
                     onChange={(e) => {
                        let target = e.target as HTMLInputElement;
                        setPageText(target.value);
                     }}
                     onBlur={(e) => {
                        e.type == 'blur' && PutMutation.mutate(pageText), setNewPage(false), setPageMenu(false);
                     }}
                     onKeyDown={(e) => {
                        e.key == 'Enter' && PutMutation.mutate(pageText), setNewPage(false), setPageMenu(false);
                     }}
                     className='w-full font-raj text-sm text-white bg-transparent h-full outline-none border p-1 border-[#c4c4c4]'
                     autoFocus
                  />
                  <i onClick={() => setrename(false)} className='cursor-pointer material-icons text-lg text-slate-50 self-center'>
                     close
                  </i>
               </div>
            ) : (
               <div className='flex flex-row items-center w-full justify-between hover:bg-[#535353]'>
                  <p
                     onClick={() => {
                        setNewPage(false), setPageId(item.id ?? '');
                     }}
                     className='outline-none border-none p-2 w-full text-[13px] cursor-pointer text-ellipsis font-sand text-slate-100 font-medium self-center'
                  >
                     {item.title.substring(0, 15) + '...'}
                  </p>
                  <i
                     onClick={() => {
                        setPageMenu(true);
                        const button = document.getElementById('popmenu') as HTMLButtonElement;
                        button.focus();
                     }}
                     className='material-icons text-lg py-2 cursor-pointer self-center text-slate-100 text-end'
                  >
                     more_horiz
                  </i>
               </div>
            )}
         </>
         <button
            id='popmenu'
            className={`w-full top-[40%] absolute -right-[30%] shadow-2xl z-20 bg-[#2f2f2f] ${
               pageMenu ? 'flex flex-col justify-end' : 'hidden'
            }`}
         >
            <div className='w-screen min-h-screen fixed z-10 inset-0' onClick={() => setPageMenu(false)}></div>
            <ul className='w-full flex flex-col items-stretch justify-center z-20 border-[0.1px] border-opacity-20 border-gray-100 gap-3 py-4 bg-[#2f2f2f] rounded-2xl'>
               <li
                  onClick={() => DelMutation.mutate(item.id)}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <Trash2 className='text-red-600 self-center' size={'1.1rem'} />
                  <span className='font-san text-base font-medium text-red-600 self-center'>Delete</span>
               </li>
               <li
                  onClick={() => {
                     setrename(true), setPageMenu(false);
                  }}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <Pencil className='text-lg text-slate-50 self-center' size={'1.1rem'} />
                  <span className='font-raj text-sm font-medium text-gray-100 self-center'>Rename page</span>
               </li>
            </ul>
         </button>
      </div>
   );
}
