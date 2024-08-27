import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { pagePreFetch } from './fetch';
import { PageContext } from '../../state/pageContext';
import InitLogic from './initlogic';

///

export default function PageInit() {
   let {
      notePageState: { currpageid, newPage },
   } = useContext(PageContext);
   const { data, status, error } = useQuery({
      queryKey: ['prefetchpage'],
      queryFn: () => pagePreFetch(currpageid),
      enabled: !!currpageid,
   });

   if (error) return <>{error.message}</>;
   if (status == 'pending') return <></>;

   if (status === 'success' && data) {
      console.log(data);
      return <InitLogic newPage={newPage} data={data.data} currpageid={currpageid} />;
   }
}
