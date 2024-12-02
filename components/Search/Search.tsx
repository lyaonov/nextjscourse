"use client"
import { KeyboardEvent, useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from 'classnames'
import GlassIcon from './glass.svg'
import { useRouter } from "next/navigation";


export const Search = ({ className, children, ...props }: SearchProps) => {
    const [search, setSearch] = useState('')
    const router = useRouter();

    const goToSearch = () => {
        router.push(`/search?q=${search}`)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            goToSearch()
        }
    }
    return (
        <div
            className={cn(styles.search, className)}
            {...props}
        >
            <Input placeholder="Поиск..." value={search} className={styles.input} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
            <Button className={styles.button} appearance={"primary"} onClick={goToSearch} >
                <GlassIcon />
            </Button>
        </div>
    )
}