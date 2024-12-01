import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { delSection } from './op';
import { updSectionName } from './op';
import { sectionId, sectionIdStore } from '../../state/section';
import PopUpMenu from '../../../utils/Popmenu';

export default function SectionItem({ item }: any) {
   const queryClient = useQueryClient();
   let [menu, setmenu] = useState(false);
   let [sectionRenameText, setSectionRenameText] = useState(item.title);
   let [renameAction, setRenameAction] = useState(false);
   let setSectionId = sectionIdStore((state: sectionId) => state.setSectionId);

   const delSectMutation = useMutation({
      mutationFn: (id: string) => delSection(id),
      mutationKey: ['delSection'],
      onSuccess: async () => {
         setmenu(false), await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
      },
      onError: (error) => console.log(error),
   });

   const PutMutation = useMutation({
      mutationFn: (title: string) => updSectionName(item.id, { title }),
      mutationKey: ['updatePageName'],
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
         setmenu(false), setRenameAction(false);
      },
   });
   return (
      <div
         onContextMenu={() => setmenu(!menu)}
         onClick={() => setSectionId(item.id)}
         className='flex cursor-pointer flex-row items-center justify-start p-3 w-full hover:bg-[#636363] relative'
      >
         <>
            {renameAction ? (
               <>
                  <input
                     value={sectionRenameText}
                     type='text'
                     onChange={(e) => {
                        let target = e.target as HTMLInputElement;
                        setSectionRenameText(target.value);
                     }}
                     onBlur={() => {
                        setRenameAction(false);
                        PutMutation.mutate(sectionRenameText);
                     }}
                     onKeyDown={(e) => {
                        e.key == 'Enter' && PutMutation.mutate(sectionRenameText);
                     }}
                     className='w-full font-sand text-sm text-white bg-transparent h-full outline-none border p-1 border-[#c4c4c4]'
                     autoFocus
                  />
                  <i onClick={() => setRenameAction(false)} className='cursor-pointer material-icons text-xl text-slate-50 self-center'>
                     close
                  </i>
               </>
            ) : (
               <p className='font-play text-slate-100 font-medium self-center text-sm text-ellipsis truncate w-full'>
                  {item.title.substring(0, 30)}
               </p>
            )}
         </>
         <PopUpMenu setswitch={setmenu} Switch={menu} DelAction={delSectMutation} id={item.id} setrename={setRenameAction} />
      </div>
   );
}
