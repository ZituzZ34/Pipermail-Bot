import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Mail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mailId: string;

    @Column()
    date: Date;
}