import PostPage from './PostPage';
import PutPage from './PutPage';

export default function PageInterface({ init }: { init: boolean }) {
   return init ? <PostPage /> : <PutPage />;
}
