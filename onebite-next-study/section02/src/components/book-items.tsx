import type { BookData } from "@/types";
import Link from "next/link";
import style from "@/components/book-item.module.css"
import { title } from 'process';

export default function BookItem({
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
}: BookData) {
    return (
        <Link href={`/book/${id}`} className={style.container}>
            <img src={coverImgUrl}></img>
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <br/>
                <div className={style.author}>{author} | {publisher}</div>
            </div>
        </Link>
    );
}