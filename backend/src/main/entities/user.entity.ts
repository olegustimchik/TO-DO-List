import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ListsEntity } from "./lists.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar", length: 255, nullable: false, unique: true,
  })
  email!: string;

  @Column({
    type: "varchar", length: 255, nullable: false,
  })
  password!: string;

  @Column({
    type: "varchar", length: 255, nullable: false,
  })
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => ListsEntity, list => list.user)
  lists!: ListsEntity[];
}
