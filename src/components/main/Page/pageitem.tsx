import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updPageName } from './fetch';
import { deletePage } from './fetch';
import { PageCurrentId, PageStore } from '../../state/page';
import PopUpMenu from '../../../utils/Popmenu';
import { usePageControllerStore } from '../../state/note';

export default function PageItem({ item }: any) {
   const [pageMenu, setPageMenu] = useState(false);
   const [rename, setrename] = useState(false);
   const [pageText, setPageText] = useState(item.title);
   const queryClient = useQueryClient();
   const [newPage, setNewPage] = PageStore((s) => [s.newPage, s.setNewPage]);
   const [setSignal, setPageId, pageId] = PageCurrentId((s) => [s.setSignal, s.setPageId, s.pageId]);
   const setstate = usePageControllerStore((state: any) => state.setSlide);

   const DelMutation = useMutation({
      mutationFn: (id: string) => deletePage(id),
      mutationKey: ['delPage'],
      onSuccess: async () => {
         setPageMenu(false);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
      },
   });
   const PutMutation = useMutation({
      mutationFn: (title: string) => updPageName(item.id, { title }),
      mutationKey: ['updatePageName'],
      onSuccess: async () => {
         setPageMenu(false);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
         setrename(false);
      },
   });

   function checkResponsiveness() {
      const body = document.body as HTMLBodyElement;
      body.clientWidth <= 640 ? setstate() : {};
      setNewPage('false'), setPageId(item.id ?? '');
      console.log(newPage);
   }

   useEffect(() => console.log(newPage), [newPage]);

   const focusBodyFn = () => {
      setPageMenu(true);
      const button = document.getElementById('popmenu') as HTMLButtonElement;
      button.focus();
   };

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
                        e.type == 'blur' && PutMutation.mutate(pageText), setNewPage('false'), setPageMenu(false), setSignal();
                     }}
                     onKeyDown={(e) => {
                        e.key == 'Enter' && PutMutation.mutate(pageText), setNewPage('false'), setPageMenu(false), setSignal();
                     }}
                     className='w-full font-sand text-base text-white bg-transparent h-full outline-none border p-1 border-[#c4c4c4]'
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
                        checkResponsiveness();
                        item && setPageId(item.id);
                     }}
                     className={`${
                        item.id == pageId ? 'text-rose-100' : ''
                     } truncate outline-none border-none p-2 w-[70%] text-[14px] cursor-pointer text-ellipsis font-sand text-slate-100 font-medium self-center`}
                  >
                     {item.title.substring(0, 30)}
                  </p>
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='20'
                     height='20'
                     viewBox='0 0 24 24'
                     fill='none'
                     stroke='currentColor'
                     strokeWidth='2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     className={`lucide lucide-ellipsis cursor-pointer self-center text-slate-50 text-end ${
                        pageId == item.id ? 'text-rose-100' : ''
                     }`}
                     onClick={focusBodyFn}
                  >
                     <circle cx='12' cy='12' r='1' />
                     <circle cx='19' cy='12' r='1' />
                     <circle cx='5' cy='12' r='1' />
                  </svg>
               </div>
            )}
         </>
         <PopUpMenu setswitch={setPageMenu} Switch={pageMenu} DelAction={DelMutation} id={item.id} setrename={setrename} />
      </div>
   );
}
