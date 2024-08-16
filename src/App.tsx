import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Authentication, Layout } from '.';
import { Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <Routes>
            <Route path='/' Component={Authentication} />
            <Route path='/home' Component={Layout} />
         </Routes>
      </QueryClientProvider>
   );
};

export default App;
