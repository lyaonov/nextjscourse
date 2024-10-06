"use client"
import styles from "./Prouduct.module.css";
import { ProductProps } from "./Product.props";
import cn from 'classnames'
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { declOfNum, priceRu } from "@/helpers/helpers";
import { Devider } from "../Devider/Devider";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import Link from "next/link";
import { motion } from 'framer-motion'


export const Product = motion(forwardRef(({ className, product, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [isReviewOpened, setIsReviewOpened] = useState(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    }

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }

    return (
        <div ref={ref} className={className} {...props}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image src={product.image} alt={product.title} width={70} height={70} />
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>{priceRu(product.credit)}/<span className={styles.month}>мес</span></div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
                <div className={styles.tags}>{product.categories.map((tag) => <Tag key={tag} className={styles.category} color="ghost" >{tag}</Tag>)}</div>
                <div className={styles.priceTitle}>цена</div>
                <div className={styles.creditTitle}>кредит</div>
                <div className={styles.reviewCount}><Link href={'#ref'} onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</Link></div>
                <Devider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feauture}>
                    {product.characteristics.map((c) => (
                        <div key={c.name} className={styles.characteristics}>
                            <div className={styles.characteristicsName}>{c.name}</div>
                            <div className={styles.characteristicsDots}></div>
                            <div className={styles.characteristicsValue}>{c.value}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && (
                        <div className={styles.advantages}>
                            <div className={styles.advTitle}>Преимущества</div>
                            <div >{product.advantages}</div>
                        </div>
                    )}
                    {product.disadvantages && (
                        <div className={styles.disadvantages}>
                            <div className={styles.advTitle}>Недостатки</div>
                            <div>{product.disadvantages}</div>
                        </div>)}
                </div>
                <Devider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнее</Button>
                    <Button appearance="ghost" arrow={isReviewOpened ? 'down' : 'right'} className={styles.reviewButton} onClick={() => setIsReviewOpened(!isReviewOpened)}>Читать отзывы</Button>
                </div>

            </Card>
            <motion.div
                animate={isReviewOpened ? 'visible' : 'hidden'}
                variants={variants}
                initial={'hidden'}>
                <Card
                    color="blue"
                    ref={reviewRef}
                    tabIndex={isReviewOpened ? 0 : -1}
                    className={cn(styles.reviews)}>
                    {product.reviews.map((rev) => (
                        <div key={rev._id}>
                            <Review review={rev} />
                            <Devider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>
            </motion.div>
        </div>
    )
}))