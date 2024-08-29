import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//:PAGE
export const createANewPage = async function (req: Request, res: Response) {
   const { userId, title, content, sectionId } = req.body;
   const id = req.params.id;
   if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const section = await prisma.section.findUnique({ where: { id: sectionId } });
      if (user && section) {
         const updatePage = await prisma.page.update({
            where: { id },
         })
      }
   }
};
