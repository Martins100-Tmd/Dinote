import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { JWT } from '../util/jwt';
import { color } from '../util/color';

const prisma = new PrismaClient();

//:SIGNUP
export const createANewUser = async function (req: Request, res: Response) {
   const { username, email, password } = req.body;
   const checkRedundantCreation = await prisma.user.findUnique({
      where: { email: req.body.email },
   });
   if (checkRedundantCreation) {
      res.status(403).json({ success: false, msg: 'User already exist' });
   } else {
      const createUser = await prisma.user.create({
         data: { username, email, password },
      });
      if (createUser) {
         res.status(200).json({ success: true, message: 'User created!!', token: JWT(createUser.id) });
      }
   }
};

//:NOTE
export const createANewNote = async function (req: Request, res: Response) {
   let { userId, title } = req.body;
   const createNote = await prisma.note.create({
      data: {
         title,
         color,
         userId,
      },
   });
   if (createNote) {
      res.status(200).json({ message: 'New Note successfully created!', success: true });
   } else {
      res.status(400).json({ message: 'Note creation unsuccessful', success: false });
   }
};

//:SECTION
export const createANewSection = async function (req: Request, res: Response) {
   const { title, noteId } = req.body;
   const createSection = await prisma.section.create({
      data: {
         title,
         color: '#282828',
         noteId,
      },
   });
   if (createSection) {
      res.status(200).json({ createSection });
   }
};

//:LOGIN
export const authenticateUser = async function (req: Request, res: Response) {
   const { email, password } = req.body;
   let userHasAccount, token;
   if (email && password) {
      userHasAccount = await prisma.user.findUnique({
         where: {
            email,
            password,
         },
      });
      token = JWT(userHasAccount?.id || '');
   }
   if (userHasAccount) res.status(200).json({ success: true, info: userHasAccount, token });
   else res.status(400).json({ success: false, msg: 'Bad request' });
};

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
         if (createPage) res.status(201).json({ success: true, msg: `Note (${createPage.title}):${createPage.id}`, id: createPage.id });
         else res.status(400).json({ success: false, msg: 'Unable to create page' });
      } else res.status(403).json({ success: false, msg: 'section or user does not exist' });
   }
};
