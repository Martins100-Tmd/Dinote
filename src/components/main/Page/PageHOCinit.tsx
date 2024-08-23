import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { sectionId } from '../../state/section';
import { addPage } from './fetch';
interface bodyReq {
   title: string;
   content: string;
   sectionId: string;
}

export default function PAGEINITHOC({ tag, val }: { tag: ReactNode; val?: string }) {
   let currSectId = sectionId((s: any) => s.currSectId);
   const queryClient = useQueryClient();
   let [body, setbody] = useState<bodyReq>({
      title: '',
      content: '',
      sectionId: currSectId,
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

   return tag === 'input' ? (
      <input
         onBlur={() => (body.title ? addMutation.mutate(body) : '')}
         onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setbody((bd: any) => ({ ...bd, title: target.value }));
         }}
         value={val}
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
         value={val}
         className='text-slate-100 text-xl w-full h-full font-raj text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
