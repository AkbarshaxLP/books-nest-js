import { PrismaService } from "src/prisma.service";
import { Book } from "./book.model";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BookService {

  constructor(private prisma: PrismaService) { }

  async getAllBook(page = 1, perPage = 10): Promise<{ results: Book[]; count: number; totalPages: number; page: number; }> {
    const skip = (page - 1) * perPage;
    const [results, total] = await Promise.all([
      this.prisma.book.findMany({
       orderBy: {
         id: 'asc',
       },
       skip,
       take: perPage,
     }),
     this.prisma.book.count(),
    ]);
    const totalPages = Math.ceil(total / perPage);
    return {page, count: total, totalPages, results}
  }

  async getBook(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id: Number(id) } })
  }

  async createBook(data: Book): Promise<Book> {
    return this.prisma.book.create({
      data,
    })
  }

  async updateBook(id: number, data: Book): Promise<Book> {
    return this.prisma.book.update({
      where: { id: Number(id) },
      data: { name: data.name, description: data.description }
    })
  }

  async deleteBook(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: { id: Number(id) }
    })
  }
}