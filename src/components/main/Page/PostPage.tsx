import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { addPage } from './fetch';
import { useContext, useState } from 'react';
import { formattedDate } from '../../../utils/date';
import { bodyReq } from '../../../types';
import { PageContext } from '../../state/pageContext';
import { sectionId, sectionIdStore } from '../../state/section';
import { PageCurrentId, PageIdState } from '../../state/page';

export default function PostPage() {
   const queryClient = useQueryClient();
   let sectionId = sectionIdStore((state: sectionId) => state.sectionId);
   let setPageId = PageCurrentId((s: PageIdState) => s.setPageId);
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: sectionId,
   });

   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         setPageId(data.id);
         setTimeout(async () => await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] }), 10);
      },
      onError: async (error) => {
         console.log(error);
      },
   });
   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:p-10 gap-10 sm:-ml-2'>
         <section className='flex flex-col items-center gap-3'>
            <Input addMutation={addMutation} body={body} setbody={setbody} sectionId={sectionId} />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start w-full font-sand text-slate-200'>{formattedDate(new Date())}</p>
            </div>
         </section>
         <TextArea addMutation={addMutation} body={body} setbody={setbody} />
      </section>
   );
}

interface FormInt {
   body: { title: string; content: string };
   addMutation: UseMutationResult<any, Error, any, unknown>;
   setbody: Function;
   sectionId?: string;
}

function Input({ addMutation, body, setbody, sectionId }: FormInt) {
   let { setNewPage } = useContext(PageContext);
   let [len, setlen] = useState('150px');

   return (
      <>
         <input
            onBlur={() => {
               setNewPage(false);
               body.title && sectionId ? addMutation.mutate(body) : '';
            }}
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setlen(target.value.length * 10 + 'px');
               setbody((bd: any) => ({ ...bd, title: target.value }));
            }}
            value={body.title}
            type='text'
            style={{ width: len }}
            className={`text-start self-start outline-none border-b bg-transparent border-slate-200 font-sand text-slate-100 text-xl font-medium`}
            autoFocus
         />
      </>
   );
}

function TextArea({ body, addMutation, setbody, sectionId }: FormInt) {
   return (
      <textarea
         onBlur={() => {
            body.title && sectionId ? addMutation.mutate(body) : addMutation.mutate({ ...body, title: 'untitled' });
         }}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setbody((bd: any) => ({ ...bd, content: target.value }));
         }}
         value={body.content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}

function isSmallScreen() {
   const width = document.body.clientWidth;
   return width > 640 ? false : true;
}
