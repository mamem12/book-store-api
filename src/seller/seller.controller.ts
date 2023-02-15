import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, Request, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from 'src/books/books.service';
import { CreateBooksDto } from 'src/books/dto/create-books.dto';

@Controller('seller')
export class SellerController {

    constructor(
        private readonly booksService : BooksService,
    ) {}

    // 등록
    @UseGuards(JwtAuthGuard)
    @Post("/regbooks")
    @UseInterceptors(FileInterceptor("image"))
    regBooks(@Body() createbooksDto : CreateBooksDto, @UploadedFile() file : Express.Multer.File, @Request() req) {
        // const base64 = file.buffer.toString("base64")
        console.log(req.user)
        console.log(file)
        
        createbooksDto.image = file.filename;
        createbooksDto.user_id = req.user.userId;
        // console.log(createbooksDto)
        return this.booksService.regBooks(createbooksDto)
    }

    // 개별 재고 확인
    @UseGuards(JwtAuthGuard)
    @Get("/stocks/:id")
    stock(@Request() req, @Param("id") booksId : number) {
        
        return this.booksService.stocksById(req.user.userId, booksId)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/stocks/")
    stockㄴ(@Request() req) {
        
        return this.booksService.stocks(req.user.userId)
    }

    

}
