"use client"

import styles from "./TopPage.module.css";
import { TopPageProps } from "./TopPage.props";
import { Htag, Tag, HhData, Advantages, Sort, Product } from "@/components";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { SortEnum } from "@/components/Sort/Sort.props";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { useScrollY } from "@/hooks/useScrollY";


export const TopPageComponent = ({ page, products, firstCategory }: TopPageProps) => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

    const y = useScrollY();

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    }

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products })
    }, [products])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">
                    {page?.title}
                </Htag>
                {products?.length ? <Tag color="gray" size="m">{products?.length}</Tag> : null}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => (
                    <Product layout key={p._id} product={p} />
                ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">
                    Вакансии - {page?.category}
                </Htag>
                <Tag color="red" size="m">hh.ru</Tag>
            </div>
            {page?.hh && firstCategory === TopLevelCategory.Courses ? <HhData {...page?.hh} /> : null}
            {page?.advantages && page.advantages.length > 0 && (
                <>
                    <Htag tag={"h2"}>Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            )}

            {page?.seoText && (
                <div className={styles.seo} dangerouslySetInnerHTML={{
                    __html: page.seoText
                }} />
            )}

            <Htag tag={"h2"}>Получаемые навыки</Htag>
            {page?.tags.map((tag) => {
                return (
                    <Tag key={tag} color='primary' size="s">{tag}</Tag>
                )
            })}
        </div>
    )
}