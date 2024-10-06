import { AdvantagesProps } from "./Advantages.props";
import styles from './Advantages.module.css'
import CheckIcon from './icons/check.svg'

export const Advantages = ({ advantages }: AdvantagesProps) => {
    return (
        <>
            {advantages.map((advantage) => {
                return (
                    <div key={advantage._id} className={styles.advantage}>
                        <CheckIcon />
                        <div className={styles.title}>{advantage.title}</div>
                        <hr className={styles.vline} />
                        <div className={styles.description}>{advantage.description}</div>
                    </div>
                )
            })}
        </>
    )
}