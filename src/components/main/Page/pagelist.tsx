import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useEffect, useMemo } from 'react';
import { fetchSectionPages } from './fetch';
import { PageCurrentId, PageStore, sortAction } from '../../state/page';
import { sortFunctions } from './fetch';
import { sectionIdStore } from '../../state/section';

export default function PageListContainer() {
   let sectionId = sectionIdStore((state) => state.sectionId);
   const [newPage, setNewPage] = PageStore((s) => [s.newPage, s.setNewPage]);
   let { action, setAction } = sortAction();
   let [pageId, setPageId] = PageCurrentId((state) => [state.pageId, state.setPageId]);

   let { isSuccess, isLoading, isError, error, data, status } = useQuery({
      queryKey: ['fetchSectionPages', sectionId],
      queryFn: () => fetchSectionPages(sectionId),
      enabled: !!sectionId,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
      refetchOnMount: false,
   });

   //Check if the response is empty
   let dataIsEmpty = useMemo(() => data && JSON.stringify(data.data) == '[]', [status]);

   //return a processed version of the data result using a sort function
   let processedData = useMemo(() => {
      setAction('None');
      if (data && sortFunctions[action](data.data).length > 0) return sortFunctions[action](data.data);
      else if (data) return data.data;
   }, [data, action, sectionId]);

   useEffect(() => {
      if (pageId && dataIsEmpty) setNewPage('false');
      if (data && isSuccess && !pageId && data.data && data.data[0]) {
         setPageId(data.data[0].id ?? '');
      }
   }, [pageId, status]);

   useEffect(() => {
      if (data && data.data[0]) setPageId(data.data[0].id ?? '');
      if (dataIsEmpty || data == undefined) setPageId(''), console.log('EMPTY', pageId);
   }, [sectionId]);

   if (isLoading) return <LoadingPageList />;

   if (isError) return <>{error?.message}</>;

   if (isSuccess && !dataIsEmpty)
      return processedData.length > 0
         ? processedData.map((item: any, index: number) => <PageItem item={item} key={index} />)
         : data && data.map((item: any, index: number) => <PageItem item={item} key={index} />);
}
