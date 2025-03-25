import { ListsEntity }                                                         from "@/main/entities/lists.entity";
import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
  lists!: Array<ListsEntity>;
}
