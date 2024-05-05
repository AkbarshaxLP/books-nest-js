import { Body, Controller, Delete, Get, Param, Post, Patch, Req, Res, ParseIntPipe, Query  } from "@nestjs/common";
import { Book } from "./book.model";
import { BookService } from "./book.service";
import { Request, Response } from "express";

@Controller('api/v1/book')
export class BookController {

  constructor(private readonly bookService: BookService) { }

  @Get()
  async getAllBook(
    @Req() request: Request,
    @Res() response: Response,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,): Promise<any> {
    const results = await this.bookService.getAllBook(page, perPage)
    return response.status(200).json(results)
  }

  @Post()
  async postBook(@Body() postData: Book): Promise<Book> {
    return this.bookService.createBook(postData)
  }

  @Get(':id')
  async getBook(@Param('id') id: number): Promise<Book | null> {
    return this.bookService.getBook(id)
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<Book> {
    return this.bookService.deleteBook(id)
  }

  @Patch(':id')
  async updateBook(@Param('id') id: number, @Body() data: Book): Promise<Book> {
    return this.bookService.updateBook(id, data);
  }
}