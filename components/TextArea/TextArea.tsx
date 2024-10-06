import { ForwardedRef, forwardRef } from "react";
import styles from "./TextArea.module.css";
import { TextAreaProps } from "./TextArea.props";
import cn from 'classnames'


export const TextArea = forwardRef(({ className, error, ...props }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <textarea ref={ref} className={cn(styles.textarea, {
                [styles.error]: error
            })} {...props} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})