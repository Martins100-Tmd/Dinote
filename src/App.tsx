import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Authentication, Layout } from '.';
import { Route, Routes } from 'react-router-dom';
import { SectionContextProvider } from './components/state/sectContext';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 0,
      },
   },
});

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <SectionContextProvider>
            <Routes>
               <Route path='/' Component={Authentication} />
               <Route path='/home' Component={Layout} />
            </Routes>
         </SectionContextProvider>
      </QueryClientProvider>
   );
};

export default App;
