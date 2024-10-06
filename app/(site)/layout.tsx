import type { Metadata } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import styles from "../page.module.css";
import '../globals.css'
import { Header, Sidebar, Footer, Up } from "@/components";
import { AppProvider, IAppContext } from "@/context/app.context";
import { getMenu } from "@/api/menu";
import { TopLevelCategory } from "@/interfaces/page.interface";


const inter = Noto_Sans_KR({ subsets: ["latin"], preload: true, display: 'swap' });

export const metadata: Metadata = {
  title: "Наш лучший топ",
};

const firstCategory = TopLevelCategory.Courses

export default async function RootLayout({
  children,
  router
}: Readonly<{
  children: React.ReactNode;
  router: any;
}>) {
  const menu = await getMenu(firstCategory)

  return (
    <html lang="ru">
      <body className={inter.className}>
        <AppProvider menu={menu} firstCategory={firstCategory}>
          <div className={styles.wrapper}>
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <div className={styles.body}>
              {children}
            </div>
            <Footer className={styles.footer} />
            <Up />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
