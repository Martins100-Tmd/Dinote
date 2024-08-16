import { Main, NavBar } from '..';
import ProtectedRoute from '../utils/HOC/route';

const Layout = () => {
   return (
      <ProtectedRoute>
         <NavBar />
         <Main />
      </ProtectedRoute>
   );
};

export default Layout;
