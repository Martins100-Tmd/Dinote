import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useState, useContext, useEffect } from 'react';
import { addPage } from './fetch';
import { PageContext } from '../../state/pageContext';
interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}

export default function PAGEINITHOC({ tag, val }: { tag: ReactNode; val?: string }) {
   let {
      notePageState: { sectpageid, newPage },
   } = useContext(PageContext);
   const queryClient = useQueryClient();
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: sectpageid,
   });
   const addMutation = useMutation({
      mutationKey: ['addPage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         console.log(data);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         console.log(error);
      },
   });
   useEffect(() => {
      if (tag == 'input') setbody((prev) => ({ ...prev, title: val ?? '' }));
      if (tag == 'textarea') setbody((prev) => ({ ...prev, content: val ?? '' }));
   }, [val]);

   useEffect(() => {
      if (newPage) setbody((prev) => ({ ...prev, content: '', title: '', sectionId: sectpageid }));
   }, [newPage]);

   return tag === 'input' ? (
      <input
         onBlur={() => {
            body.title ? addMutation.mutate(body) : '', console.log(body);
         }}
         onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setbody((bd: any) => ({ ...bd, title: target.value }));
         }}
         value={body.title}
         type='text'
         className='w-full outline-none border-b bg-transparent border-slate-200 font-raj text-slate-100 text-3xl font-medium'
         autoFocus
      />
   ) : (
      <textarea
         onBlur={() => (body.title ? addMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setbody((bd) => ({ ...bd, content: target.value }));
         }}
         value={body.content}
         className='text-slate-100 text-xl w-full h-full font-raj text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
