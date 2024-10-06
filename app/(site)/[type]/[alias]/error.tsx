'use client'
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <div>
            Что-то пошло не так
            {JSON.stringify(error)}
            <button onClick={reset}>Перезагрузить</button>
        </div>
    )
}