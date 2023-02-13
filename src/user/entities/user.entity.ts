import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column({default : 100})
    public point : number;

    @Column({default : "c"})
    @Index()
    public category : string;
    // 사용자 유형 분리
    // c - customer, s - seller

}
