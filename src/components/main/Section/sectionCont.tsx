import { useQuery } from '@tanstack/react-query';
import { UtilFunc, backendAPI } from '../../..';
import LoadingSectionList from './loading';
import SectionList from './sectionList';

const fetchNoteSection = async (id: string) => {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/section/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

export default function SectionContainer({ id }: { id: string }) {
   let sectionQuery = useQuery({ queryKey: ['sectionList'], queryFn: () => fetchNoteSection(id) });

   if (sectionQuery.isLoading) return LoadingSectionList;
   if (sectionQuery.isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-raj text-base text-center text-white'>{sectionQuery.error.message}</p>
         </div>
      );
   if (sectionQuery.isSuccess) {
      return sectionQuery.data.map((item: any) => {
         <SectionList item={item} fn={UtilFunc} />;
      });
   }
}
