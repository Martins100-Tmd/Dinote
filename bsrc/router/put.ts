import express from 'express';
import userAuthMiddleWare from '../middleware/userId';
import { deleteNote, deleteSection } from '../controller/delete';

export const putRouter = express.Router();

putRouter.put('/onenote/:id', userAuthMiddleWare);
putRouter.put('/onesect/:id', userAuthMiddleWare);
putRouter.put('/onepage/:id', userAuthMiddleWare);
