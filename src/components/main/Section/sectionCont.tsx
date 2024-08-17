import { useQuery } from '@tanstack/react-query';
import { UtilFunc, backendAPI } from '../../..';
import LoadingSectionList from './loading';
import SectionList from './sectionList';
import { useEffect, useState, useContext } from 'react';
import createNoteState from '../../state/context';

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

export default function SectionContainer({ id }: { id: string }) {
   let {
      state: { noteObj },
   } = useContext(createNoteState);
   let [sectionData, setSectionData] = useState<any[]>([{ title: '' }]);
   let sectionQuery = useQuery({ queryKey: ['sectionList', noteObj, id], queryFn: () => fetchNoteSection(noteObj ? noteObj['id'] : id) });

   useEffect(() => {
      if (sectionQuery.isSuccess && sectionQuery.data) setSectionData(sectionQuery.data.data);
   }, [sectionQuery.status]);

   useEffect(() => {
      sectionQuery.refetch();
   }, [id]);

   if (sectionQuery.isLoading) return LoadingSectionList;
   if (sectionQuery.isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{sectionQuery.error.message}</p>
         </div>
      );
   return (
      sectionQuery.data &&
      sectionData &&
      sectionData.map &&
      (noteObj || id) &&
      sectionData.map((item) => <SectionList item={item} fn={UtilFunc.randomColor} />)
   );
}
