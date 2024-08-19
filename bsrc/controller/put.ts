import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//:PAGE
export const createANewPage = async function (req: Request, res: Response) {
   const { userId, title, content, sectionId } = req.body;
   if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const section = await prisma.section.findUnique({ where: { id: sectionId } });
      if (user && section) {
         const createPage = await prisma.page.create({
            data: { title, content, sectionId },
         });
         if (createPage) res.status(201).json({ success: true, msg: `Note (${createPage.title}):${createPage.id}` });
         else res.status(400).json({ success: false, msg: 'Unable to create page' });
      } else res.status(403).json({ success: false, msg: 'section or user does not exist' });
   }
};
