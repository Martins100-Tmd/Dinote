import { useEffect, useState, useCallback } from 'react';
import { PageEditInterface } from '../../../types';
import { debounceFn } from '../../../utils/debounce';
import { PageStore } from '../../state/page';

export function TextArea({ body, setBody, pageId, updateMutation }: PageEditInterface) {
   const [action, setAction] = useState(false);
   const [newPage, setNewPage] = PageStore((s) => [s.newPage, s.setNewPage]);

   useEffect(() => {
      if (body && body.sectionId && action && pageId) {
         updateMutation.mutate(
            { ...body },
            {
               onSuccess() {
                  setNewPage('false');
               },
            }
         );
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
            callDebounce();
         }}
         value={body.content}
         className='text-slate-100 text-sm w-full h-full font-sand text-start bg-transparent outline-none border-none'
      ></textarea>
   );
}
