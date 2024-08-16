import { useQuery } from '@tanstack/react-query';
import { AuthenticateUser } from './fetch';
import { ReactNode, useEffect, useState } from 'react';
import { Authentication } from '../..';

interface RouteChildren {
   children: ReactNode;
}

const ProtectedRoute = ({ children }: RouteChildren) => {
   let [isAuthenticated, setAuthentication] = useState<boolean>(false);
   const authQuery = useQuery({
      queryKey: ['authenticatedRoute'],
      queryFn: () => AuthenticateUser(),
   });
   useEffect(() => {
      if (authQuery.isSuccess) setAuthentication(true);
      if (authQuery.isError) setAuthentication(false);
      if (authQuery.isLoading) console.log('....Loading');
   }, [authQuery.status]);

   if (!isAuthenticated) return <Authentication />;
   if (isAuthenticated) return children;
};

export default ProtectedRoute;
