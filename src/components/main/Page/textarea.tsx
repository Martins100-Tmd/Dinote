import { useEffect } from 'react';
import { PageEditInterface } from '../../../types';

export function TextArea({ addMutation, sectionId, body, setBody, pageId, updateMutation }: PageEditInterface) {
   const decisionMaker = function () {
      if (body.title && sectionId) {
         if (pageId) {
            updateMutation.mutate({ ...body });
         } else {
            addMutation.mutate({ ...body });
         }
      }
   };

   useEffect(() => {
      setTimeout(() => decisionMaker(), 3000);
   }, []);

   return (
      <textarea
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setBody((prev: any) => ({ ...prev, content: target.value }));
         }}
         value={body.content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
