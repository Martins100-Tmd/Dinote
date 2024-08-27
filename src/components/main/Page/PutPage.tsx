import { UseMutationResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addPage, getSolePage } from './fetch';
import { PageContext } from '../../state/pageContext';
import { useContext, useState, useEffect } from 'react';
import { DateString } from '../../../utils/date';

export interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}

export default function PutPage() {
   const queryClient = useQueryClient();
   let {
      notePageState: { sectpageid, currpageid },
   } = useContext(PageContext);
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: sectpageid,
   });
   const getSolePageQuery = useQuery({
      queryKey: ['getPageContent', currpageid],
      queryFn: ({ queryKey }) => getSolePage(queryKey[1], body),
      enabled: !!currpageid,
   });
   useEffect(() => {
      if (getSolePageQuery.isSuccess) {
         let data = getSolePageQuery.data['data'];
         setbody((prev) => ({ ...prev, title: data['title'], content: data['content'] }));
      }
   }, [getSolePageQuery.status]);

   const updateMutation = useMutation({
      mutationKey: ['updatePage'],
      mutationFn: (body: bodyReq) => addPage(body),
      onSuccess: async (data) => {
         console.log(data);
         await queryClient.invalidateQueries({ queryKey: ['fetchSectionPages'] });
      },
      onError: async (error) => {
         console.log(error);
      },
   });

   return (
      <section className='w-full h-full bg-[#2c2c2c] flex flex-col items-start p-10 gap-10'>
         <section className='flex flex-col items-center gap-3'>
            <Input updateMutation={updateMutation} body={body} setbody={setbody} />
            <div className='flex items-center w-full justify-start'>
               <p className='text-start w-full font-raj text-slate-200'>{DateString}</p>
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
         onBlur={() => {
            body.title ? updateMutation.mutate(body) : '', console.log(body);
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
         className='text-slate-100 text-xl w-full h-full font-raj text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
