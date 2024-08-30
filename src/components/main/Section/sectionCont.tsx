import { useQuery } from '@tanstack/react-query';
import { UtilFunc, backendAPI } from '../../..';
import LoadingSectionList from './loading';
import SectionList from './sectionList';
import { useEffect, useContext, useMemo, useState } from 'react';
import createNoteState from '../../state/context';

export default function SectionContainer({ id }: { id: string }) {
   let {
      state: { noteObj },
   } = useContext(createNoteState);

   let ID = useMemo(() => (noteObj ? noteObj['id'] : ''), [noteObj]);
   let [currsection, _] = useState(localStorage.getItem('sectpageid') ?? '');

   useEffect(() => console.log(currsection), [currsection]);

   let { data, isSuccess, isLoading, isError, error, status } = useQuery({
      queryKey: ['sectionList', ID],
      queryFn: () => fetchNoteSection(noteObj ? ID : id),
      refetchOnMount: false,
      enabled: !!ID,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
   });

   useEffect(() => {
      if (isSuccess && data['data'] && data['data'][0]) localStorage.setItem('sectpageid', data['data'][0]['id']);
      else localStorage.setItem('sectpageid', '');
      if (isLoading) console.log('SectionContainer loading...');
   }, [status, data]);

   if (isLoading) return <LoadingSectionList />;

   if (isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{error?.message}</p>
         </div>
      );
   if (isSuccess && data) {
      return (
         data &&
         (noteObj || id) &&
         data.data.map((item: any, index: number) => <SectionList key={index} item={item} fn={UtilFunc.randomColor} />)
      );
   }
}

const fetchNoteSection = async (id: string) => {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/section/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return id ? await A.json() : new Promise((res) => res([]));
};
