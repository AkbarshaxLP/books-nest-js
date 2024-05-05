import { Prisma } from "@prisma/client";

export class Book implements Prisma.BookCreateInput {
  id: number;
  name: string;
  description?: string;
}