import { ForwardedRef, forwardRef } from "react";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";
import cn from 'classnames'


export const Card = forwardRef(({ color = 'white', className, children, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            className={cn(styles.card, className, {
                [styles.blue]: color === 'blue',
                [styles.white]: color === 'white',
            })}
            {...props}
        >
            {children}
        </div>
    )
})