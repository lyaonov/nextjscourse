import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import up from "./Up.svg";
import close from "./krest.svg";
import menu from "./menu.svg";

export const Icons = {
    up, close, menu
}

export type IconName = keyof typeof Icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    appearance: 'primary' | 'white';
    icon: IconName;
}