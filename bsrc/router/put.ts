import express from 'express';
import userAuthMiddleWare from '../middleware/userId';
import { updateAPage, updatePageName, updateSectionName } from '../controller/put';

export const putRouter = express.Router();

putRouter.put('/onenote/:id', userAuthMiddleWare);
putRouter.put('/onesect/:id', userAuthMiddleWare);
putRouter.put('/onepage/:id', userAuthMiddleWare, updateAPage);
putRouter.put('/pagename/:id', userAuthMiddleWare, updatePageName);
putRouter.put('/sectname/:id', userAuthMiddleWare, updateSectionName);
