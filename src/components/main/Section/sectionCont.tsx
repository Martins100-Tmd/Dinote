import { useQuery } from '@tanstack/react-query';
import { UtilFunc, backendAPI } from '../../..';
import LoadingSectionList from './loading';
import SectionList from './sectionList';
import { useEffect, useContext, useMemo } from 'react';
import createNoteState from '../../state/context';
import sectionContext from '../../state/sectContext';

export default function SectionContainer({ id }: { id: string }) {
   let {
      state: { noteObj },
   } = useContext(createNoteState);
   let { setCurrSection } = useContext(sectionContext);

   let ID = useMemo(() => (noteObj ? noteObj['id'] : ''), [noteObj]);

   let sectionQuery = useQuery({
      queryKey: ['sectionList', ID],
      queryFn: () => fetchNoteSection(noteObj ? ID : id),
      refetchOnMount: '',
      enabled: !!ID,
   });

   useEffect(() => {
      if (sectionQuery.isSuccess && sectionQuery.data['data']) setCurrSection(sectionQuery.data.data[0]['id']);
   }, [sectionQuery.status]);

   if (sectionQuery.isLoading) return <LoadingSectionList />;
   if (sectionQuery.isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{sectionQuery.error.message}</p>
         </div>
      );
   if (sectionQuery.isSuccess && sectionQuery.data) {
      return (
         sectionQuery.data &&
         (noteObj || id) &&
         sectionQuery.data.data.map((item: any, index: number) => <SectionList key={index} item={item} fn={UtilFunc.randomColor} />)
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
