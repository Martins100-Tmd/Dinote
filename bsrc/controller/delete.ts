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
   const user = await prisma.user.findUnique({ where: { id: userId } });
   if (user) {
      const delSection = await prisma.section.delete({
         where: {
            id,
         },
      });
      if (delSection) {
         res.status(200).json({ success: true, msg: `Section: ${delSection.title} deleted!` });
      } else res.status(400).json({ success: false, msg: `Error deleting Section` });
   } else res.status(403).json({ success: false, msg: 'Unauthorized User!' });
};
