import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useContext, useEffect, useMemo } from 'react';
import { fetchSectionPages } from './fetch';
import { PageContext } from '../../state/pageContext';
import { PageCurrentId, sortAction } from '../../state/page';
import { sortFunctions } from './fetch';
import { sectionIdStore } from '../../state/section';

export default function PageListContainer() {
   let sectionId = sectionIdStore((state) => state.sectionId);
   let { setNewPage } = useContext(PageContext);
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

   let isDataEmpty = useMemo(() => data && JSON.stringify(data.data) == '[]', [data]);

   let DATA = useMemo(() => {
      setAction('None');
      if (data && data.data) return sortFunctions[action](data.data).length > 0 ? sortFunctions[action](data.data) : data.data;
   }, [data, action, sectionId]);

   useEffect(() => {
      if (pageId || isDataEmpty) setNewPage(false);
      if (data && isSuccess && !pageId && data.data && data.data[0]) {
         setPageId(data.data[0].id ?? '');
      }
   }, [pageId, status]);

   useEffect(() => {
      if (data && data.data && data.data[0]) setPageId(data.data[0].id ?? '');
      if (isDataEmpty || data == undefined) setPageId('');
   }, [sectionId]);

   if (isLoading) return <LoadingPageList />;

   if (isError) return <>{error?.message}</>;

   if (isSuccess) {
      if (!isDataEmpty)
         return DATA.length > 0
            ? DATA.map((item: any, index: number) => <PageItem item={item} key={index} />)
            : data.data && data.data.map((item: any, index: number) => <PageItem item={item} key={index} />);
   }
}
