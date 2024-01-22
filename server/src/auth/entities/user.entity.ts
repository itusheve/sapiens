// src/users/user.entity.ts
import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;
  @Column()
  name: string;
  @Column({unique:true})
  email: string;
  @Column()
  password:string;
  @Column()
  role:string;
}
