import { TasksEntity }                                                         from "@/main/entities/tasks.entity";
import { UserListEntity }                                                      from "@/main/entities/user-list.entity";
import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

  @OneToMany(() => UserListEntity, userListEntity => userListEntity.list, { eager: true })
  usersLists: Array<UserListEntity>;

  @OneToMany(() => TasksEntity, task => task.list, { eager: true })
  tasks!: Array<TasksEntity>;
}
