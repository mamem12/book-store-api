import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateBooksDto {
    
    
    @IsString()
    book_name: string;

    @IsNumber()
    price : number;
    
    @IsNumber()
    amount: number;

    @IsNumber()
    user_id: number;

    @IsString()
    image : string;

}
