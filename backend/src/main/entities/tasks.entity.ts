import { ListsEntity }                                                         from "@/main/entities/lists.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity("tasks")
export class TasksEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type    : "varchar",
    length  : 255,
    nullable: false,
  })
  name!: string;

  @Column({
    type    : "varchar",
    length  : 255,
    nullable: false,
  })
  description!: string;

  @Column({
    type   : "boolean",
    default: false,
  })
  completed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ListsEntity, list => list.tasks)
  list!: ListsEntity;
}
