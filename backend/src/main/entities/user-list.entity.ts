import { ListsEntity }                                              from "@/main/entities/lists.entity";
import { UserEntity }                                               from "@/main/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Index, Column } from "typeorm";

import { UserRoles }                                                from "../enums/user-roles";

@Entity()
@Index(["user", "list"], { unique: true })
export class UserListEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserEntity, user => user.userLists, { onDelete: "CASCADE" })
  user!: UserEntity;

  @ManyToOne(() => ListsEntity, list => list.usersLists, { onDelete: "CASCADE" })
  list!: ListsEntity;

  @Column({
    type: "enum", enum: UserRoles, default: UserRoles.EDITOR,
  })
  role!: UserRoles;
}
