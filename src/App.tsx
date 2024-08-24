import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Authentication, Layout } from '.';
import { Route, Routes } from 'react-router-dom';
import { NoteStateProvider } from './components/state/context';
import { PageContextProvider } from './components/state/pageContext';
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
         <NoteStateProvider>
            <SectionContextProvider>
               <PageContextProvider>
                  <Routes>
                     <Route path='/' Component={Authentication} />
                     <Route path='/home' Component={Layout} />
                  </Routes>
               </PageContextProvider>
            </SectionContextProvider>
         </NoteStateProvider>
      </QueryClientProvider>
   );
};

export default App;
