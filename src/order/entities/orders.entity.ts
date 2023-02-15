import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "orders"})
export class Orders {

    @PrimaryGeneratedColumn("increment")
    @Column({type: 'bigint', primary : true})
    public id?: number;

    @Column({type : "int", comment : "책 아이디" })
    public book_id : number;
 
    @Column({type : "int", comment : "구매 수량" })
    public amount : number;
 
    @Column({type : "int", comment : "구매하는 유저 아이디" })
    public user_id : number;

    @Column({type: "char", comment : "상태"})
    public stat : string;

}