import { useQuery } from '@tanstack/react-query';
import LoadingSectionList from './loading';
import SectionItem from './sectionItem';
import { useEffect, useMemo } from 'react';
import { fetchNoteSection } from './op';
import { sectionIdStore } from '../../state/section';
import { pageControllState } from '../../../types/page';
import { PageStore } from '../../state/page';

export default function SectionContainer({ id }: { id: string }) {
   const setSectionId = sectionIdStore((state) => state.setSectionId);

   const { data, isSuccess, isLoading, isError, error } = useQuery({
      queryKey: ['sectionList', id],
      queryFn: () => fetchNoteSection(id ?? ''),
      refetchOnMount: false,
      enabled: !!id,
      refetchOnWindowFocus: false,
   });

   const [rawData, dataIsEmpty] = useMemo<any>(() => {
      if (data) return [data.data, JSON.stringify(data.data) == '[]'];
      return [[], true];
   }, [data]);

   useEffect(() => {
      if (dataIsEmpty) setSectionId('');
   }, [data]);

   if (isLoading) return <LoadingSectionList />;

   if (isError)
      return (
         <div className='w-full flex justify-center p-4 rounded shadow'>
            <p className='font-sand text-base text-center text-white'>{error?.message}</p>
         </div>
      );

   if (isSuccess && data) {
      if (rawData[0] && !dataIsEmpty) setSectionId(data['data'][0]['id']);
      return data && id && rawData.map((item: any, index: number) => <SectionItem key={index} item={item} />);
   }
}
