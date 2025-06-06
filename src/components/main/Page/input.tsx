import { useState, useEffect, useCallback } from 'react';
import { PageEditInterface } from '../../../types';
import { debounceFn } from '../../../utils/debounce';
import { PageCurrentId, PageStore } from '../../state/page';

export function Input({ addMutation, sectionId, pageId, updateMutation, body, setBody }: PageEditInterface) {
   const [len, setlen] = useState('150px');
   const [action, setAction] = useState(false);
   const setPageId = PageCurrentId((s) => s.setPageId);
   const [newPage, setNewPage] = PageStore((s) => [s.newPage, s.setNewPage]);

   useEffect(() => {
      if (body.title && sectionId && action) {
         if (newPage) {
            addMutation.mutate(
               { ...body },
               {
                  onSuccess(data, _) {
                     setPageId(data.id);
                     setNewPage(false);
                  },
               }
            );
         } else if (pageId) {
            updateMutation.mutate({ ...body });
         }
      }
      setAction(false);
   }, [action, body, sectionId, pageId, newPage]);

   let callDebounce = useCallback(
      debounceFn(function () {
         setAction(true);
      }, 400),
      []
   );

   useEffect(() => {
      if (newPage) {
         setBody((prev: any) => ({ ...prev, title: '', content: '' }));
         console.log(body);
      }
   }, [newPage, setBody]);

   useEffect(() => {
      setlen(function () {
         let VAL = 8;
         return body.title.length * VAL + 50 + 'px';
      });
   }, [body]);

   return (
      <>
         <input
            onChange={(e) => {
               const target = e.target as HTMLInputElement;
               setBody((prev: any) => ({ ...prev, title: target.value }));
               callDebounce();
            }}
            value={body.title}
            type='text'
            style={{ width: len }}
            className={`text-start self-start outline-none border-b bg-transparent border-slate-200 font-sand text-slate-100 text-[15px] sm:text-xl font-medium`}
            autoFocus
         />
      </>
   );
}
