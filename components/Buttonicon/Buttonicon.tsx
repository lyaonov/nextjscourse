import { ButtonIconProps, Icons } from "./Buttonicon.props";
import styles from "./Buttonicon.module.css";
import cn from 'classnames'

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps) => {
    const IconComponent = Icons[icon];

    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance === 'primary',
                [styles.white]: appearance === 'white',
            })}
            {...props}
        >
            <IconComponent />
        </button>
    )
}