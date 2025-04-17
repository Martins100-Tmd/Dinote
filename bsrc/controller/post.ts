import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { JWT } from '../util/jwt';
import { color } from '../util/color';
import { config } from 'dotenv';
import { decryptUserPassword, encryptUserPassword } from '../util/hash';
const prisma = new PrismaClient();
config({ path: '../.env' });

//:SIGNUP
export const createANewUser = async function (req: Request, res: Response) {
   const { username, email, password } = req.body;
   const checkRedundantCreation = await prisma.user.findUnique({
      where: { email: req.body.email },
   });
   if (checkRedundantCreation) {
      res.status(403).json({ success: false, msg: 'User already exist' });
   } else {
      const { cipherText, iv, tag } = encryptUserPassword(process.env.CRYPTO_KEY!, password);
      const createUser = await prisma.user.create({
         data: { username, email, password: cipherText, iv, tag },
      });
      if (createUser) {
         const constantNote = await prisma.note.create({
            data: {
               title: '~',
               color: '#000',
               userId: createUser.id,
            },
         });
         if (constantNote) res.status(200).json({ success: true, message: 'User created!!(^ folder)', token: JWT(createUser.id) });
         else res.status(200).json({ success: true, message: '' });
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

//SECTION
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
   const reqPassword = password;
   let isUserExist, token;
   if (email && reqPassword) {
      isUserExist = await prisma.user.findUnique({ where: { email } });
      const { password, iv, tag, id, ...rest }: any = isUserExist;
      const plainPassword = isUserExist ? decryptUserPassword(process.env.CRYPTO_KEY!, password, iv, tag) : '';
      token = plainPassword == reqPassword ? JWT(id || '') : '';
   }
   if (isUserExist) {
      res.status(200).json({ success: true, info: isUserExist, token });
   } else res.status(400).json({ success: false, msg: 'Bad request' });
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
