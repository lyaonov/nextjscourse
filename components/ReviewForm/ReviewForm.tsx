"use client"

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { TextArea } from "../TextArea/TextArea";
import styles from "./ReviewForm.module.css";
import { ReviewFromProps } from "./ReviewForm.props";
import cn from 'classnames'
import CloseIcon from './close.svg'
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/app/api";
import { useState } from "react";


export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFromProps) => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setIsError] = useState<string | undefined>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true)
                reset();
            } else {
                setIsError('Что-то пошло не так попробуйте обновить страницу')
            }
        } catch (e) {
            setIsError('Что-то пошло не так попробуйте обновить страницу')
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input {...register('name', { required: { value: true, message: 'Заполните имя' } })} placeholder="Имя" error={errors.name} tabIndex={isOpened ? 0 : -1} />
                <Input {...register('title', { required: { value: true, message: 'Заполните заголовок' } })} className={styles.title} error={errors.title} placeholder="Заголовок отзыва" tabIndex={isOpened ? 0 : -1} />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={({ field }) => (<Rating tabIndex={isOpened ? 0 : -1} ref={field.ref} isEditable rating={field.value} setRating={field.onChange} error={errors.rating} />)}
                    />

                </div>
                <TextArea tabIndex={isOpened ? 0 : -1}  {...register('description', { required: { value: true, message: 'Заполните отзыв' } })} placeholder="Текст отзыва" error={errors.description} className={styles.description} />
                <div className={styles.submit}>
                    <Button tabIndex={isOpened ? 0 : -1} appearance="primary">Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыва пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && (
                <div className={styles.success}>
                    <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                    <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                    <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
                </div>
            )}
            {error && (
                <div className={styles.error}>
                    {error}
                    <CloseIcon className={styles.close} onClick={() => setIsError(undefined)} />
                </div>
            )}
        </form>
    )
}