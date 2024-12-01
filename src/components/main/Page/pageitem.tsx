import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PageContext } from '../../state/pageContext';
import { updPageName } from './fetch';
import { deletePage } from './fetch';
import { PageCurrentId, PageIdState } from '../../state/page';
import PopUpMenu from '../../../utils/Popmenu';
import { useStore } from '../../state/note';

export default function PageItem({ item }: any) {
   let [pageMenu, setPageMenu] = useState(false);
   let [rename, setrename] = useState(false);
   let [pageText, setPageText] = useState(item.title);

   const queryClient = useQueryClient();
   const { setNewPage } = useContext(PageContext);
   let [setSignal, setPageId] = PageCurrentId((s: PageIdState) => [s.setSignal, s.setPageId]);
   let setstate = useStore((state: any) => state.setSlide);

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
                        e.type == 'blur' && PutMutation.mutate(pageText), setNewPage(false), setPageMenu(false), setSignal();
                     }}
                     onKeyDown={(e) => {
                        e.key == 'Enter' && PutMutation.mutate(pageText), setNewPage(false), setPageMenu(false), setSignal();
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
                        const body = document.body as HTMLBodyElement;
                        setNewPage(false), setPageId(item.id ?? '');
                        body.clientWidth <= 640 ? setstate() : {};
                     }}
                     className='truncate outline-none border-none p-2 w-[70%] text-[13px] cursor-pointer text-ellipsis font-play text-slate-100 font-medium self-center'
                  >
                     {item.title.substring(0, 30)}
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
         <PopUpMenu setswitch={setPageMenu} Switch={pageMenu} DelAction={DelMutation} id={item.id} setrename={setrename} />
      </div>
   );
}
