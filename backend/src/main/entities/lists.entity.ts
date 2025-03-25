import { UserEntity }                                                                     from "@/main/entities//user.entity";
import { TasksEntity }                                                                    from "@/main/entities/tasks.entity";
import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

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

  @OneToMany(() => TasksEntity, task => task.list, { eager: true, onDelete: "CASCADE" })
  tasks!: Array<TasksEntity>;
}
