import { products } from "@prisma/client";

export type SerializedProductType = Omit<products, "price"> & { price: number };
