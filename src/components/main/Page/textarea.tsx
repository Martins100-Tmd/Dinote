import { useEffect, useState } from 'react';
import { PageEditInterface } from '../../../types';
import { debounceFn } from '../../../utils/debounce';

export function TextArea({ addMutation, sectionId, body, setBody, pageId, updateMutation }: PageEditInterface) {
   const [action, setAction] = useState(false);
   useEffect(() => {
      if (body.content && sectionId && action) {
         if (pageId) {
            updateMutation.mutate({ ...body });
         } else {
            addMutation.mutate({ ...body });
         }
      }
   }, [action]);

   let callDebounce = debounceFn(function () {
      setAction(!action);
   }, 3000);

   return (
      <textarea
         onChange={(e) => {
            const target = e.target as HTMLTextAreaElement;
            setBody((prev: any) => ({ ...prev, content: target.value }));
         }}
         onInput={() => callDebounce()}
         value={body.content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
