import express, { Express } from 'express';
import cors from 'cors';
import { getRouter } from './router/get';
import { postRouter } from './router/post';
import { deleteRouter } from './router/delete';

const app: Express = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/get', getRouter);
app.use('/post', postRouter);
app.use('/delete', deleteRouter);

app.listen(3001, () => {
   console.log('Listening on port 3001');
});
