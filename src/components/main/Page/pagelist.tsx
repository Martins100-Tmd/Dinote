import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '../../..';
import LoadingPageList from './loadingpages';
import { PageItem } from './pageitem';
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
   let pageQuery = useQuery({ queryKey: ['fetchSectionPages', currSectId], queryFn: () => fetchSectionPages(currSectId) });
   let [pageData, setPageData] = useState<any[]>([]);

   useEffect(() => {
      console.log(currSectId);
      if (pageQuery.isSuccess && pageQuery.data && pageQuery.data.map) {
         setPageData(pageQuery.data);
         setcurrPageId(pageData[0].id);
      }
   }, [currSectId, pageQuery.status]);

   if (pageQuery.isLoading) return LoadingPageList;
   if (pageQuery.isError) console.log(pageQuery.error);
   // return pageData && pageData.map((item: any) => <PageItem item={item} />);
   if (pageData) {
      pageData.map((item: any) => <PageItem item={item} />);
   }
}
