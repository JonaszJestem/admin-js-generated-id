import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TypeORMUser extends BaseEntity {
  @PrimaryColumn({ name: "user_id" })
  userId!: string;

  @Column()
  name!: string;
}
