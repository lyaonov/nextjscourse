import { ReviewModel } from "@/interfaces/product.interface";
import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ReviewFromProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    productId: string;
    isOpened: boolean;
}