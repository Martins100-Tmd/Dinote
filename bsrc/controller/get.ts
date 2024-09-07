import cors from 'cors';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async function (req: Request, res: Response) {
   const getAllUsers = await prisma.user.findMany();
   if (getAllUsers) res.status(200).json({ data: getAllUsers });
};

//:user note
export const getUserNotes = async function (req: Request, res: Response) {
   const getNotes = await prisma.note.findMany();
   if (getNotes) {
      res.status(200).json({ getNotes });
   }
};

//:user with notes
export const getUserWithNote = async function (req: Request, res: Response) {
   const { userId } = req.body;
   const authUser = userId && prisma.user.findUnique({ where: { id: userId } });
   if (authUser) {
      const getUserWithNote = await prisma.user.findUnique({
         where: {
            id: userId,
         },
         include: {
            notes: { where: { userId } },
         },
      });
      if (getUserWithNote) {
         res.status(200).json({ getUserWithNote });
      } else res.status(400).json({ success: false, msg: 'Operation failed!' });
   }
};

export const routeAuth = async function (req: Request, res: Response) {
   const { userId } = req.body;
   if (userId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
         res.status(200).json({ success: true, message: 'allow user' });
      } else {
         res.status(400).json({ success: false, message: 'dont allow user' });
      }
   }
};

export const getNoteSections = async function (req: Request, res: Response) {
   const { userId } = req.body;
   let id = req.params.id,
      Section;
   if (userId && id) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const note = await prisma.note.findUnique({ where: { id } });
      if (user && note) {
         Section = await prisma.section.findMany({
            where: {
               noteId: id,
            },
         });
      }
      if (Section) res.status(200).json({ success: true, data: Section });
      else res.status(400).json({ success: false, msg: 'Failed to get section' });
   } else res.status(400).json({ success: false, msg: 'make sure note id is correct and exist' });
};

export const getSectionPages = async function (req: Request, res: Response) {
   const { userId } = req.body;
   let id = req.params.id,
      Pages;
   if (userId && id) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const section = await prisma.section.findUnique({ where: { id } });

      if (user && section) {
         Pages = await prisma.page.findMany({
            where: {
               sectionId: id,
            },
         });
      }
      if (Pages) res.status(200).json({ success: true, data: Pages });
      else res.status(400).json({ success: false, msg: 'Failed to get pages' });
   } else res.status(400).json({ success: false, msg: 'make sure note id is correct and exist' });
};

export const getPage = async function (req: Request, res: Response) {
   let [{ userId }, pageId] = [req.body, req.params.id];

   if (userId && pageId) {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (user) {
         const onePage = await prisma.page.findUnique({ where: { id: pageId } });

         if (onePage) console.log(onePage), res.status(200).json({ success: true, data: onePage });
         else res.status(400).json({ success: false, msg: 'Error getting page' });
      } else res.status(404).json({ success: false, msg: 'User not found' });
   }
};
