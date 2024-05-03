'use client';

import { useState } from 'react';
import useSWR from 'swr';

import styles from './page.module.css';

import { fetchOnePost } from '@/libs/fetchOnePost';

const ComponentOne = () => {
    const {data} = useFetchPost();
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentOne</span>
        </div>
    ) : (
        <div>...Loading ComponentOne</div>
    );
};

// я конечно больше работал с tanstack query, но думаю логика одна
// так как в ComponentOne запрос на fetchOnePost будет отправляться сразу, то запрос по этому ключу custom_key_1 будет кэшироваться
// и мы может просто записать так же const { data } = useSWR('custom_key_1', fetchOnePost);
// или же вынести в свой кастомный хук
const ComponentTwo = () => {
    const {data} = useFetchPost();
    //...some logic

    return data ? (
        <div className={styles.card}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <span>ComponentTwo</span>
        </div>
    ) : (
        <div>...Loading ComponentTwo</div>
    );
};

export default function Home() {
    const [showComponentTwo, setShowComponentTwo] = useState(false);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <ComponentOne />
                {showComponentTwo ? (
                    <ComponentTwo />
                ) : (
                    <button className={styles.btn} onClick={() => setShowComponentTwo(true)}>
                        Show ComponentTwo
                    </button>
                )}
            </div>
        </main>
    );
}

const FETCH_POST_KEY = 'custom_key_1';

const useFetchPost = () => useSWR(FETCH_POST_KEY, fetchOnePost);