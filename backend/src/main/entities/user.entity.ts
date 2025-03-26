import { UserListEntity }                                                      from "@/main/entities/user-list.entity";
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

  @OneToMany(() => UserListEntity, userListEntity => userListEntity.user, { eager: true })
  userLists: Array<UserListEntity>;
}
