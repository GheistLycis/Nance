import { CreateDateColumn, PrimaryGeneratedColumn, RelationOptions, UpdateDateColumn } from "typeorm"

export default class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @DeleteDateColumn()
  // deletedAt: Date
}

export const manyToOneOptions: RelationOptions = {
  onDelete: 'CASCADE',
}

export const oneToManyOptions: RelationOptions = {
  cascade: true,
}

export const manyToManyOptions: RelationOptions = {
  onDelete: 'CASCADE',
  eager: true,
}