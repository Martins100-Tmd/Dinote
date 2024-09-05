import { useContext, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PageContext } from '../../state/pageContext';
import { updPageName } from './fetch';
import { deletePage } from './fetch';

export default function PageItem({ item }: any) {
   let [pageMenu, setPageMenu] = useState(false);
   let [rename, setrename] = useState(false);
   let [pageText, setPageText] = useState(item.title);
   const queryClient = useQueryClient();
   const { setPageId, setNewPage } = useContext(PageContext);

   let ref = useRef(null);
   let inpRef = useRef(null);

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
      <div
         onClick={() => {
            setNewPage(false), localStorage.setItem('currpageid', item.id), setPageId(localStorage.getItem('currpageid') ?? '');
         }}
         className='relative flex flex-row w-full hover:bg-[#535353] items-center justify-between px-4 py-2 border-l-4 border-emerald-700 rounded-l-md'
      >
         <>
            {rename ? (
               <>
                  <input
                     value={pageText}
                     type='text'
                     ref={inpRef}
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
                  <i onClick={() => setrename(false)} className='cursor-pointer material-icons text-xl text-slate-50 self-center'>
                     close
                  </i>
               </>
            ) : (
               <>
                  <p className='outline-none border-none text-ellipsis font-redit text-slate-100 font-medium self-center'>{item.title}</p>
                  <i
                     onClick={() => setPageMenu(!pageMenu)}
                     className='material-icons text-xl cursor-pointer self-center text-slate-100 text-end'
                  >
                     more_horiz
                  </i>
               </>
            )}
         </>
         <div ref={ref} className={`w-full top-[40%] absolute bg-[#535353] -right-[30%] shadow-2xl z-50 ${pageMenu ? 'flex' : 'hidden'}`}>
            <ul className='w-full flex flex-col items-stretch justify-center gap-2 py-2'>
               <li className='flex justify-end w-full px-2 cursor-pointer' onClick={() => setPageMenu(false)}>
                  <i className='material-icons sm:text-lg text-slate-200'>close</i>
               </li>

               <li
                  onClick={() => DelMutation.mutate(item.id)}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <i className='material-icons text-2xl text-slate-50 self-center'>close</i>
                  <span className='font-raj text-lg font-medium text-slate-100 self-center'>Delete page</span>
               </li>
               <li
                  onClick={() => {
                     setrename(true), setPageMenu(false);
                  }}
                  className='flex flex-row items-center w-full p-1 gap-2 px-4 cursor-pointer hover:bg-[#727272]'
               >
                  <i className='material-icons text-2xl text-slate-50 self-center'>drive_file_rename_outline</i>
                  <span className='font-raj text-lg font-medium text-slate-100 self-center'>Rename page</span>
               </li>
            </ul>
         </div>
      </div>
   );
}
