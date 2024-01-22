// src/users/user.entity.ts
import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Property {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  address: string;
  @Column()
  category: string;
  @Column()
  price:number;
  @Column()
  image:string;
  @Column()
  buyerID:string;
}
