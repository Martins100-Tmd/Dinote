import { useQuery } from '@tanstack/react-query';
import { AuthenticateUser } from './fetch';
import { ReactNode, useEffect, useState } from 'react';
import { Authentication } from '../..';
import { useNavigate } from 'react-router-dom';

interface RouteChildren {
   children: ReactNode;
}

const ProtectedRoute = ({ children }: RouteChildren) => {
   let [isAuthenticated, setAuthentication] = useState<boolean>(false);
   const authQuery = useQuery({
      queryKey: ['authenticatedRoute'],
      queryFn: () => AuthenticateUser(),
   });
   const navigate = useNavigate();

   useEffect(() => {
      if (authQuery.isSuccess) setAuthentication(true);
      if (authQuery.isError) setAuthentication(false), navigate('/');
      if (authQuery.isLoading) console.log('....Loading');
   }, [authQuery.status]);

   if (!isAuthenticated) return <Authentication />;
   if (isAuthenticated) return children;
};

export default ProtectedRoute;
