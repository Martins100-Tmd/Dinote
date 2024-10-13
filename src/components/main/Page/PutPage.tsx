import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSolePage, updatePage } from './fetch';
import { useState, useEffect, useContext } from 'react';
import { bodyReq } from '../../../types';
import sectionContext from '../../state/sectContext';
import { PageContext } from '../../state/pageContext';

export default function PutPage() {
   const queryClient = useQueryClient();
   let {
      sectionState: { currsection },
   } = useContext(sectionContext);
   let {
      notePageState: { currpageid },
   } = useContext(PageContext);

   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: currsection,
      updatedAt: '',
   });

   useEffect(() => console.log(currpageid), [currpageid]);

   const getSolePageQuery = useQuery({
      queryKey: ['getPageContent', currpageid],
      queryFn: () => getSolePage(currpageid),
      enabled: !!currpageid,
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 10000,
      refetchOnMount: false,
   });

   useEffect(() => {
      if (getSolePageQuery.isSuccess && getSolePageQuery.data && getSolePageQuery.data['data']) {
         let data = getSolePageQuery.data['data'];
         console.log(data);
         const updateTime = new Date(data['createdAt']);
         const formattedDate = updateTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
         });
         setbody((prev) => ({ ...prev, title: data['title'], content: data['content'], updatedAt: formattedDate }));
      }
   }, [getSolePageQuery.status, currpageid]);

   const updateMutation = useMutation({
      mutationKey: ['updatePage'],
      mutationFn: (body: bodyReq) => updatePage(body, currpageid),
      onSuccess: async () => {
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
         await queryClient.invalidateQueries({ queryKey: ['getPageContent'] });
      },
      onError: async (error) => {
         console.log(error);
      },
   });

   useEffect(() => console.log('PutPage'), []);

   return (
      <section className='w-full h-full bg-[rgba(33,33,33,.9)] flex flex-col items-start px-10 py-7 gap-10'>
         <section className='flex flex-col items-center gap-3'>
            <Input updateMutation={updateMutation} body={body} setbody={setbody} />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start text-xs w-full font-sand text-slate-200'>{body.updatedAt}</p>
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
      <input
         onBlur={() => (body.title ? updateMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setbody((bd: any) => ({ ...bd, title: target.value }));
         }}
         value={body.title}
         type='text'
         className='w-full outline-none border-b bg-transparent border-slate-200 text-slate-100 font-sand text-xl font-medium'
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
         className='text-white text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none font-normal'
      ></textarea>
   );
}
