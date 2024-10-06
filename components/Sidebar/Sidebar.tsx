import { Menu } from "../Menu/Menu";
import { SidebarProps } from "./Sidebar.props";
import styles from './Sidebar.module.css'
import LogoIcon from '../logo.svg'
import cn from 'classnames'
import { Search } from "../Search/Search";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
    return (
        <div className={cn(className, styles.sidebar)} {...props}>
            <LogoIcon className={styles.logo} />
            <Search />
            <Menu />
        </div>
    )
}