import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : "user"})
export class Users {

    @PrimaryGeneratedColumn("increment")
    @Column({type: 'bigint', comment: '유저 아이디', primary : true})
    public id?: number;

    @Column({ unique: true, type : "varchar", length : "20", comment : "email" })
    public email: string;

    @Column({type: 'varchar', length: 20, comment: '유저 닉네임'})
    public name: string;

    @Column({type: 'varchar', length: 20, comment: '유저 비밀번호'})
    public password: string;

    @Column({default : 100, type: 'int', comment: '유저 포인트'})
    public point : number;

    @Column({default : "c", type: 'char', length: 1, comment: '유저 유형'})
    @Index()
    public category : string;
    // c - customer, s - seller

}
