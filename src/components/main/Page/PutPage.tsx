import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSolePage, updatePage } from './fetch';
import { useState, useEffect } from 'react';
import { bodyReq } from '../../../types';
import { formattedDate } from '../../../utils/date';
import { sectionId, sectionIdStore } from '../../state/section';
import { PageCurrentId, PageIdState } from '../../state/page';

export default function PutPage({ pageId }: { pageId: string }) {
   const queryClient = useQueryClient();
   let sectionId = sectionIdStore((state: sectionId) => state.sectionId);
   let Sig = PageCurrentId((s: PageIdState) => s.getSignal);
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId,
      updatedAt: '',
   });

   const { isSuccess, data, status } = useQuery({
      queryKey: ['getPageContent', pageId, Sig],
      queryFn: () => getSolePage(pageId),
      enabled: !!pageId,
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 10000,
      refetchOnMount: false,
   });

   useEffect(() => {
      if (isSuccess && data && data['data']) {
         const formatDate = formattedDate(new Date(data.data.createdAt));
         setbody((prev) => ({ ...prev, title: data.data['title'], content: data.data['content'], updatedAt: formatDate }));
      }
   }, [status, pageId]);

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

   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:px-10 sm:py-7 gap-5 sm:gap-8'>
         <section className='flex flex-col items-center gap-2 sm:gap-3 w-full'>
            <Input updateMutation={updateMutation} body={body} setbody={setbody} />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start text-[11px] sm:text-xs w-full font-sand text-slate-200'>{body.updatedAt}</p>
            </div>
         </section>
         <TextArea updateMutation={updateMutation} body={body} setbody={setbody} />
      </section>
   );
}

interface FormInt {
   body: { title: string; content: string };
   updateMutation: UseMutationResult<any, Error, any, unknown>;
   setbody: Function;
}

function Input({ updateMutation, body, setbody }: FormInt) {
   return (
      <div className='flex flex-col items-start w-full gap-2'>
         <input
            onBlur={() => (body.title ? updateMutation.mutate(body) : '')}
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setbody((bd: any) => ({ ...bd, title: target.value }));
            }}
            value={body.title}
            className='w-3/5 outline-none bg-transparent text-slate-100 overflow-hidden font-play text-base sm:text-lg font-medium'
            autoFocus={!!body.title}
         />
         <div className='h-[2px] bg-slate-200 w-3/5'></div>
      </div>
   );
}

function TextArea({ body, updateMutation, setbody }: FormInt) {
   return (
      <textarea
         onBlur={() => (body.content ? updateMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setbody((bd: any) => ({ ...bd, content: target.value }));
         }}
         value={body.content}
         className='text-white text-xs sm:text-sm w-full h-full font-play text-start bg-transparent outline-none border-none font-normal'
      ></textarea>
   );
}
