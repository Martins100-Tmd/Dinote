import { useState, useEffect, useCallback } from 'react';
import { PageEditInterface } from '../../../types';
import { debounceFn } from '../../../utils/debounce';

export function Input({ addMutation, sectionId, pageId, newPage, updateMutation, body, setBody }: PageEditInterface) {
   const [len, setlen] = useState('150px');
   const [action, setAction] = useState(false);

   useEffect(() => {
      if (body.title && sectionId && action) {
         console.log(body.title);
         // if (pageId) {
         //    updateMutation.mutate({ ...body });
         // } else {
         //    addMutation.mutate({ ...body });
         // }
      }
      setAction(false);
   }, [action]);

   let callDebounce = useCallback(
      debounceFn(function () {
         setAction(true);
      }, 1000),
      []
   );

   useEffect(() => {
      newPage ? setBody((prev: any) => ({ ...prev, title: '' })) : '';
   }, [newPage]);

   return (
      <>
         <input
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setlen(target.value.length * 10 + 'px');
               setBody((prev: any) => ({ ...prev, title: target.value }));
               callDebounce();
            }}
            value={body.title}
            type='text'
            style={{ width: len }}
            className={`text-start self-start outline-none border-b bg-transparent border-slate-200 font-sand text-slate-100 text-xl font-medium`}
            autoFocus
         />
      </>
   );
}
