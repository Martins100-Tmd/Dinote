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
            notes: true,
         },
      });
      if (getUserWithNote) {
         res.status(200).json({ getUserWithNote });
      }
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
   const id = req.params.id;
   if (userId && id) {
      const uniqueSection = await prisma.section.findUnique({ where: { id }, include: { pages: true } });
      if (uniqueSection) res.status(200).json({ success: true, data: uniqueSection });
      else res.status(400).json({ success: false, msg: 'Failed to get section' });
   } else res.status(400).json({ success: false, msg: 'make sure note id is correct and exist' });
};
