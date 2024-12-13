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
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start p-3 sm:px-10 sm:py-7 gap-5 sm:gap-8 sm:-ml-2'>
         <section className='flex flex-col items-center gap-2 sm:gap-3 w-full overflow-hidden'>
            <Input updateMutation={updateMutation} body={body} setbody={setbody} />
            <div className='flex items-center w-full justify-start py-3'>
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
   let [len, setlen] = useState('100px');
   useEffect(() => {
      setlen(body.title.length * 9 + 'px');
   }, [body]);

   return (
      <input
         onBlur={() => (body.title ? updateMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setlen(target.value.length * 10 + 'px');
            setbody((bd: any) => ({ ...bd, title: target.value }));
         }}
         value={body.title}
         style={{ width: len }}
         className='self-start text-start outline-none bg-transparent text-wrap overflow-x-scroll text-slate-100 border-b border-slate-200 font-play text-base sm:text-lg font-medium'
         autoFocus={!!body.title}
      />
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

function isSmallScreen() {
   const width = document.body.clientWidth;
   return width > 640 ? false : true;
}
