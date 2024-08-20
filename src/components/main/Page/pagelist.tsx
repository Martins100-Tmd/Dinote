import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import LoadingPageList from './loadingpages';
import PageItem from './pageitem';
import { sectionId } from '../../state/section';
import { useEffect, useState } from 'react';
import { PageStore } from '../../state/page';

const fetchSectionPages = async function (id: string) {
   const token = JSON.parse(localStorage.getItem(':tk:') || '') ?? 'empty';
   const A = await fetch(backendAPI + 'get/page/' + id, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
      },
   });
   return await A.json();
};

export default function PageListContainer() {
   let currSectId = sectionId((s: any) => s.currSectId);
   let setcurrPageId = PageStore((s: any) => s.setClickedPageId);
   let pageQuery = useQuery({
      queryKey: ['fetchSectionPages', currSectId],
      queryFn: () => fetchSectionPages(currSectId),
   });
   let [pageData, setPageData] = useState<any[]>([]);

   useEffect(() => {
      if (pageQuery.isSuccess && pageQuery.data) {
         setPageData(pageQuery.data.data);
         // pageData ? setcurrPageId(pageData[0]['id'] ?? '') : '';
      }
   }, [pageQuery.status, pageQuery.data]);

   if (pageQuery.isLoading) return <LoadingPageList />;
   if (pageQuery.isError) console.log(pageQuery.error.message);
   return pageData.map && pageData.map((item: any, index: number) => <PageItem item={item} key={index} />);
}
