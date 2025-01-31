import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPage, updatePage } from './fetch';
import { useState, useEffect } from 'react';
import { formattedDate } from '../../../utils/date';
import { bodyReq } from '../../../types';
import { sectionIdStore } from '../../state/section';
import { PageCurrentId } from '../../state/page';
import { Input } from './input';
import { TextArea } from './textarea';

export default function PostPage() {
   const queryClient = useQueryClient();
   let sectionId = sectionIdStore((state) => state.sectionId);
   let pageId = PageCurrentId((s) => s.pageId);
   let [body, setbody] = useState({
      title: '',
      content: '',
      sectionId,
   });

   const updateMutation = useMutation({
      mutationKey: ['updatePage'],
      mutationFn: (body: bodyReq) => updatePage(body, pageId),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
      },
      onError: async (error) => {
         throw error;
      },
   });

   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         // await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
      },
      onError: async (error) => {
         throw new Error(error.message);
      },
   });

   useEffect(() => console.log(pageId), []);

   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:p-10 gap-10 sm:-ml-2'>
         <section className='flex flex-col items-center gap-3'>
            <Input
               addMutation={addMutation}
               pageId={pageId}
               updateMutation={updateMutation}
               body={body}
               setBody={setbody}
               sectionId={sectionId}
            />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start w-full font-sand text-slate-200'>{formattedDate(new Date())}</p>
            </div>
         </section>
         <TextArea addMutation={addMutation} updateMutation={updateMutation} body={body} setBody={setbody} pageId={pageId} />
      </section>
   );
}
