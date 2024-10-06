"use client"
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from 'classnames'
import LogoIcon from '../logo.svg'
import { ButtonIcon } from "../Buttonicon/Buttonicon";
import { motion } from 'framer-motion'
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Header = ({ className, ...props }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsOpen(false);
    }, [router])

    const varints = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '100%'
        }
    }


    return (
        <header {...props} className={cn(className, styles.header)}>
            <LogoIcon />
            <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpen(true)} />
            <motion.div className={styles.mobileMenu}
                variants={varints}
                initial={'closed'}
                animate={isOpen ? 'opened' : 'closed'}
            >

                <Sidebar />
                <ButtonIcon className={styles.menuClose} appearance="white" icon="close" onClick={() => setIsOpen(false)} />
            </motion.div>
        </header>
    )
}