import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { delSection } from './op';
import { updSectionName } from './op';
import { sectionIdStore } from '../../state/section';
import PopUpMenu from '../../../utils/Popmenu';

export default function SectionItem({ item }: any) {
   const queryClient = useQueryClient();
   const [menu, setmenu] = useState(false);
   const [sectionRenameText, setSectionRenameText] = useState(item.title);
   const [renameAction, setRenameAction] = useState(false);
   const [sectionId, setSectionId] = sectionIdStore((state) => [state.sectionId, state.setSectionId]);

   const deleteSectionMutation = useMutation({
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
   const deleteAction = async function (id: string) {
      deleteSectionMutation.mutate(id);
      await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
   };
   return (
      <div
         onContextMenu={() => setmenu(!menu)}
         onClick={async () => {
            setSectionId(item.id);
            await queryClient.invalidateQueries({ queryKey: ['sectionList'] });
         }}
         className='flex cursor-pointer flex-row items-center justify-start px-3 py-0.5 w-full hover:bg-[#636363] relative'
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
                        sectionRenameText.length > 0 ? PutMutation.mutate(sectionRenameText) : setRenameAction(false);
                     }}
                     onKeyDown={(e) => {
                        e.key == 'Enter' && PutMutation.mutate(sectionRenameText);
                     }}
                     className='w-full font-sand text-sm text-white bg-transparent h-full outline-none border p-1 border-[#a9a9a9]/30 rounded-md'
                     autoFocus={true}
                  />
                  <i onClick={() => setRenameAction(false)} className='cursor-pointer material-icons text-xl text-slate-50 self-center'>
                     close
                  </i>
               </>
            ) : (
               <p
                  className={`font-sand ${
                     sectionId == item.id ? 'text-white font-semibold' : ''
                  } text-slate-100 font-medium self-center text-sm text-ellipsis truncate w-full`}
               >
                  {item.title.substring(0, 30)}
               </p>
            )}
         </>
         <PopUpMenu setswitch={setmenu} Switch={menu} DelAction={deleteAction} id={item.id} setrename={setRenameAction} />
      </div>
   );
}
