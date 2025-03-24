import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { TasksEntity } from "./tasks.entity";

@Entity("lists")
export class ListsEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({
        type: "varchar", length: 255, nullable: false,
    })
    name!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => UserEntity, user => user.lists)
    user!: UserEntity;

    @OneToMany(() => TasksEntity, task => task.list)
    tasks!: TasksEntity[];
} 