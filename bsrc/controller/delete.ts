import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteNote = async function (req: Request, res: Response) {
   const { userId } = req.body;
   const id = req.params.id;
   const user = await prisma.user.findUnique({ where: { id: userId } });
   if (user) {
      const delNote = await prisma.note.delete({
         where: {
            id,
         },
      });
      if (delNote) {
         res.status(200).json({ success: true, msg: `Note: ${delNote.title} deleted!` });
      } else res.status(400).json({ success: false, msg: `Error deleting Note` });
   } else res.status(403).json({ success: false, msg: 'Unauthorized User!' });
};

export const deleteSection = async function (req: Request, res: Response) {
   const { userId } = req.body;
   const id = req.params.id;
   console.log('================\n', userId, id, '\n============ delSection');
   const user = await prisma.user.findUnique({ where: { id: userId } });
   console.log(user, 'delSection');
   if (user) {
      const delSection = await prisma.section.delete({
         where: { id },
      });
      console.log(delSection, 'delSection ---');
      if (delSection) {
         res.status(200).json({ success: true, msg: `Section: ${delSection.title} deleted!` });
      } else res.status(400).json({ success: false, msg: `Error deleting Section` });
   } else res.status(403).json({ success: false, msg: 'Unauthorized User!' });
};

export const deletePage = async function (req: Request, res: Response) {
   const { userId } = req.body;
   const id = req.params.id;
   const user = await prisma.user.findUnique({ where: { id: userId } });
   if (user) {
      const delPage = await prisma.page.delete({ where: { id } });
      console.log(delPage, id);
      if (delPage) {
         res.status(200).json({ success: true, msg: `Page: ${delPage.title} deleted!` });
      } else res.status(400).json({ success: false, msg: `Error deleting Page` });
   } else res.status(403).json({ success: false, msg: 'Unauthorized User!' });
};
