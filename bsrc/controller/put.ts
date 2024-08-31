import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//:PAGE
export const updateAPage = async function (req: Request, res: Response) {
   const { userId, title, content, sectionId } = req.body;
   const id = req.params.id;
   if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const section = await prisma.section.findUnique({ where: { id: sectionId } });
      if (user && section) {
         const updatePage = await prisma.page.update({
            where: { id },
            data: {
               title,
               content,
            },
         });
         if (updatePage) res.status(200).json({ success: true, msg: 'Page successfully updated' });
         else res.status(401).json({ success: false, msg: 'Error updating page' });
      } else
         res.status(401).json({
            success: false,
            msg: 'Make sure user and section are valid',
         });
   }
};
