/*import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly description: string;
  readonly imageURL: string;
  readonly price: number;
  readonly createAT: Date;
}*/
export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
}
