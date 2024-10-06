"use client";
import { AppContext } from "@/context/app.context";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import { useContext, KeyboardEvent } from "react";
import cn from 'classnames'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { firstLevelMenu } from "@/helpers/helpers";
import { motion } from 'framer-motion'


export const Menu = () => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const pathname = usePathname()

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory)
        }
    }

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        },
        hidden: {
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((m) => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return pages.map((page) => (
            <motion.div key={page.category} variants={variantsChildren}>
                <Link
                    tabIndex={isOpened ? 0 : -1}
                    href={`/[type]/[alias]`}
                    passHref
                    as={`/${route}/${page.alias}`}
                    className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` === pathname
                    })}>
                    {page.category}
                </Link>
            </motion.div>
        ))
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    if (m.pages.map(p => p.alias).includes(pathname.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div tabIndex={0}
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}>
                                {m._id.secondCategory}
                            </div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((menuItem) => (
                    <div key={menuItem.route}>
                        <Link href={`/[type]`} as={`/${menuItem.route}`} passHref>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: firstCategory === menuItem.id
                            })}>
                                {menuItem.icon}
                                <span>{menuItem.name}</span>
                            </div>
                        </Link>
                        {firstCategory === menuItem.id && buildSecondLevel(menuItem)}
                    </div>
                ))}
            </>
        )
    };

    return (
        <div className={styles.menu}>
            {buildFirstLevel()}
        </div>
    )
}