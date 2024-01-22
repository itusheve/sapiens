import { ObjectId } from 'typeorm';
export declare class User {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
}
