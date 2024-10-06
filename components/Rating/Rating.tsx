"use client"
import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";
import styles from "./Rating.module.css";
import { RatingProps } from "./Rating.props";
import cn from 'classnames'
import StarIcon from './star.svg'


export const Rating = forwardRef(({ isEditable = false, tabIndex, rating, setRating, children, error, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

    const changeDisplay = (rating: number) => {
        isEditable && constructRating(rating);
    }

    const onClick = (rating: number) => {
        isEditable && setRating && setRating(rating);
    }

    const handleKey = (event: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }

        if (event.code == "ArrowRight" || event.code == "ArrowUp") {
            if (!rating) {
                setRating(1)
            } else {
                event.preventDefault()
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus()
        }
        if (event.code == "ArrowLeft" || event.code == "ArrowDown") {
            event.preventDefault()
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus()
        }

    }

    const computeFocus = (r: number, i: number): number => {
        if (!isEditable) return -1;

        if (!rating && i == 0) {
            return tabIndex ?? 0
        }
        if (r == i + 1) {
            return tabIndex ?? 0
        }

        return -1
    }

    const constructRating = (currRating: number) => {
        const updatedRating = ratingArray.map((r, i) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < currRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    tabIndex={computeFocus(rating, i)}
                    onKeyDown={handleKey}
                    //@ts-ignore
                    ref={r => ratingArrayRef.current?.push(r)}
                >
                    <StarIcon

                    />
                </span>
            )
        })
        setRatingArray(updatedRating)
    }

    useEffect(() => {
        constructRating(rating)
    }, [rating, tabIndex])

    return (
        <div
            {...props}
            ref={ref}
            className={cn(styles.ratingWrapper, {
                [styles.error]: error,
            })}
        >
            {ratingArray.map((r, i) => {
                return (
                    <span key={i} >{r}</span>)
            })}

            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
})