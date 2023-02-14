import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BooksService } from 'src/books/books.service';
import { CreateBooksDto } from 'src/books/dto/create-books.dto';

@Controller('seller')
export class SellerController {

    constructor(
        private readonly booksService : BooksService,
    ) {}

    // 등록
    @Post("/regbooks")
    @UseInterceptors(FilesInterceptor("image"))
    regBooks(@Body() booksCreateDto : CreateBooksDto, @UploadedFiles() file : Array<Express.Multer.File>) {
    // regBooks(@UploadedFiles() file : Express.Multer.File) {
        console.log(file)
        return "success"
        // return this.booksService.regBooks(booksCreateDto)
    }

    // 재고 확인

}
