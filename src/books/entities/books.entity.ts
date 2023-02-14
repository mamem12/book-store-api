import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "books"})
export class Books {

    @PrimaryGeneratedColumn("increment")
    @Column({type: 'bigint', comment: '책 아이디', primary : true})
    public id?: number;

    @Column({type : "int", comment : "책 가격" })
    public price: number;

    @Column({type : "varchar", length : 20, comment : "책 이름" })
    public book_name: string;

    @Column({type: 'int', comment: '책 수량'})
    public amount: number;

    @Column({type: 'int', comment: '책 등록 user id'})
    public user_id: number;

    @Column({type: 'varchar', length:1000, comment: '책 표지 이미지 Binary'})
    public image : string;
}
