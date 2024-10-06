import { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from './Devider.module.css'
import classNames from "classnames"

export const Devider: FC<DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>> = ({ className, ...props }) => {
    return (
        <hr className={classNames(className, styles.hr)} {...props} />
    )
}