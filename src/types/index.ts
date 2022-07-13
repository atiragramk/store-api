import { Types } from "mongoose";

export type TProduct = {
  _id: Types.ObjectId;
  productId: string;
  category: string;
  price: number;
};

export type TProducts = {
  productId: string;
  quantity: number;
  total: number;
};

export type TCart = {
  userId: string;
  products: TProducts[];
  status: CartStatus;
};

export enum CartStatus {
  ACTIVE = "active",
  PAYED = "payed",
  DELETED = "deleted",
}

export enum PaymentStatus {
  CREATED = "created",
  DONE = "done",
  CANCELED = "canceled",
}
