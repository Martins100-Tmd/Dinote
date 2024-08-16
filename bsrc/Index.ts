import express, { Express } from 'express';
import cors from 'cors';
import userAuthMiddleWare from './middleware/userId';
import { getRouter } from './router/get';
import { postRouter } from './router/post';

const app: Express = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/man', (req, res) => {
   res.status(200).json({ msg: 'Welcome' });
});

app.use('/get', getRouter);
app.use('/post', postRouter);

app.listen(3001, () => {
   console.log('Listening on port 3001');
});
