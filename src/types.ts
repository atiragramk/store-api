import { Types } from "mongoose";

export type TProduct = {
  _id: Types.ObjectId;
  productId: string;
  category: string;
  price: number;
};

export type TUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

export type TProducts = {
  productId: Types.ObjectId;
  quantity: number;
  total: number;
};

export type TCart = {
  _id: Types.ObjectId;
  userId: string;
  products: TProducts[];
  status: CartStatus;
};

export type TPayment = {
  cartId: Types.ObjectId;
  status: PaymentStatus;
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
