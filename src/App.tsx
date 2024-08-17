import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Authentication, Layout } from '.';
import { Route, Routes } from 'react-router-dom';
import { NoteStateProvider } from './components/state/context';

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
         <NoteStateProvider>
            <Routes>
               <Route path='/' Component={Authentication} />
               <Route path='/home' Component={Layout} />
            </Routes>
         </NoteStateProvider>
      </QueryClientProvider>
   );
};

export default App;
