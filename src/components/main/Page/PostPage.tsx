import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPage } from './fetch';
import { useState, useEffect } from 'react';
import { formattedDate } from '../../../utils/date';
import { PageEditInterface, bodyReq } from '../../../types';
import { sectionIdStore } from '../../state/section';

export default function PostPage() {
   const queryClient = useQueryClient();
   let sectionId = sectionIdStore((state) => state.sectionId);
   let [body, setbody] = useState({
      title: '',
      content: '',
      sectionId,
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

   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:p-10 gap-10 sm:-ml-2'>
         <section className='flex flex-col items-center gap-3'>
            <Input addMutation={addMutation} body={body} setBody={setbody} sectionId={sectionId} />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start w-full font-sand text-slate-200'>{formattedDate(new Date())}</p>
            </div>
         </section>
         <TextArea addMutation={addMutation} body={body} setBody={setbody} />
      </section>
   );
}

function Input({ addMutation, sectionId }: PageEditInterface) {
   let [len, setlen] = useState('150px');
   let [title, setTitle] = useState('');

   useEffect(() => {
      setInterval(() => {
         title && sectionId ? addMutation.mutate({ title, content: '' }) : '';
      }, 5000);
   }, []);
   return (
      <>
         <input
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setlen(target.value.length * 10 + 'px');
               setTitle(target.value);
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

function TextArea({ addMutation, body, setBody, sectionId }: PageEditInterface) {
   useEffect(() => {
      setTimeout(() => {
         body.content && body.title && sectionId ? addMutation.mutate(body) : addMutation.mutate({ ...body, title: 'untitled' });
      }, 2000);
   }, []);
   return (
      <textarea
         // onBlur={() => {
         // }}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setBody((body: any) => ({ ...body, content: target.value }));
         }}
         value={body.content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
