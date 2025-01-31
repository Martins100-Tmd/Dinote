import { useEffect, useState, useCallback } from 'react';
import { PageEditInterface } from '../../../types';
import { debounceFn } from '../../../utils/debounce';

export function TextArea({ sectionId, body, setBody, newPage, pageId, updateMutation }: PageEditInterface) {
   const [action, setAction] = useState(false);

   useEffect(() => {
      if (body.content && sectionId && action && pageId) {
         console.log('Updating content');
         updateMutation.mutate({ ...body });
      }
      setAction(false);
   }, [action]);

   let callDebounce = useCallback(
      debounceFn(function () {
         setAction(true);
      }, 3000),
      []
   );

   useEffect(() => {
      newPage ? setBody((prev: any) => ({ ...prev, content: '' })) : '';
   }, [newPage]);

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
