import { ObjectId } from 'typeorm';
export declare class Property {
    id: ObjectId;
    address: string;
    category: string;
    price: number;
    image: string;
    buyerID: string;
}
