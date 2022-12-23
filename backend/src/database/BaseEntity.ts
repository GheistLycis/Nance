import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, RelationOptions, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid";

export abstract class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  constructor() {
    if(!this.id) this.id = uuid()
  }
}

export const manyToOneOptions: RelationOptions = {
  onDelete: 'CASCADE',
  cascade: true,
  eager: true,
}

export const OneToManyOptions: RelationOptions = {
  nullable: true,
}