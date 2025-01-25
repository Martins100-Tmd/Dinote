import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPage, updatePage } from './fetch';
import { useEffect, useState } from 'react';
import { formattedDate } from '../../../utils/date';
import { PageEditInterface, bodyReq } from '../../../types';
import { sectionIdStore } from '../../state/section';
import { PageCurrentId, pageTextState } from '../../state/page';

export default function PostPage() {
   const queryClient = useQueryClient();
   let sectionId = sectionIdStore((state) => state.sectionId);
   let [pageId, setPageId] = PageCurrentId((s) => [s.pageId, s.setPageId]);
   const [content, setContent, setTitle, title] = pageTextState((s) => [s.content, s.setContent, s.setTitle, s.title]);

   const updateMutation = useMutation({
      mutationKey: ['updatePage'],
      mutationFn: (body: bodyReq) => updatePage(body, pageId),
      onSuccess: async (data) => {
         setPageId(data.id);
         console.log(data.id, pageId);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         // await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         throw error;
      },
   });

   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         setPageId(data.id);
         console.log(data.id, pageId);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         throw new Error(error.message);
      },
   });

   useEffect(() => {
      console.log(pageId ? 'updateMutation' : 'addMutation');
      console.log(title, content);
   }, []);

   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:p-10 gap-10 sm:-ml-2'>
         <section className='flex flex-col items-center gap-3'>
            <Input
               Q={queryClient}
               addMutation={pageId ? updateMutation : addMutation}
               title={title}
               setTitle={setTitle}
               sectionId={sectionId}
            />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start w-full font-sand text-slate-200'>{formattedDate(new Date())}</p>
            </div>
         </section>
         <TextArea Q={queryClient} addMutation={pageId ? updateMutation : addMutation} content={content} setContent={setContent} />
      </section>
   );
}

function Input({ Q, addMutation, title, setTitle, sectionId }: PageEditInterface) {
   let [len, setlen] = useState('150px');
   useEffect(() => {
      setInterval(() => console.log('saved to DB'), 5000);
      title && sectionId ? addMutation.mutate({ title, content: '' }) : '';
   }, []);

   return (
      <>
         <input
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setlen(target.value.length * 10 + 'px');
               setTitle && setTitle(target.value);
            }}
            value={title}
            type='text'
            style={{ width: len }}
            className={`text-start self-start outline-none border-b bg-transparent border-slate-200 font-sand text-slate-100 text-xl font-medium`}
            autoFocus
         />
      </>
   );
}

function TextArea({ Q, content, title, addMutation, setContent, sectionId }: PageEditInterface) {
   useEffect(() => {
      setInterval(() => console.log('saved to DB'), 5000);
      content && title && sectionId ? addMutation.mutate({ title, content }) : addMutation.mutate({ content, title: 'untitled' });
   }, []);

   return (
      <textarea
         onBlur={async () => await Q.invalidateQueries({ queryKey: ['fetchSectionPages'] })}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setContent && setContent(target.value);
         }}
         value={content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
