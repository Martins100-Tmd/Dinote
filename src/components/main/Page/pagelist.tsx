import { useQuery } from '@tanstack/react-query';
import LoadingPageList from './loadingpages';
import PageItem from './Pageitem';
import { useEffect, useContext } from 'react';
import { fetchSectionPages } from './fetch';
import { PageContext } from '../../state/pageContext';

export default function PageListContainer() {
   let currsection = localStorage.getItem('sectpageid') ?? '';
   let {
      notePageState: { currpageid },
      setNewPage,
   } = useContext(PageContext);

   let { isSuccess, isLoading, isError, error, data, status } = useQuery({
      queryKey: ['fetchSectionPages', currsection],
      queryFn: () => fetchSectionPages(currsection),
      enabled: !!currsection,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10000,
      refetchOnMount: false,
   });

   let emptyData: string = '[]';

   useEffect(() => {
      if (currpageid || (data && JSON.stringify(data['data']) == emptyData)) setNewPage(false);
      data && isSuccess ? console.log(data, currpageid, currsection) : '';
   }, [currpageid, status, currsection]);

   if (isLoading) return <LoadingPageList />;
   if (isError) return <>{error?.message}</>;
   if (isSuccess) {
      if (JSON.stringify(data['data']) == emptyData) {
      } else return data['data'] && data.data.map((item: any, index: number) => <PageItem item={item} key={index} />);
   }
}
