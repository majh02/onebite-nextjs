import fetchOneBook from "@/lib/fetch-one-book";
import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { BookData } from '../../types';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const bookId = context.params!.id;
    const book = await fetchOneBook(Number(bookId));

    return {
        props: {
            book,
        }
    }
}

export default function Page({
    book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    if(!book) return "문제가 발생했습니다. 다시 시도해주세요.";

    const {
        id, 
        title, 
        subTitle, 
        description, 
        author, 
        publisher, 
        coverImgUrl
    } = book;

    return (
        <div className={style.container} key={id}>
            <div
                className={style.cover_img_container} 
                style={{backgroundImage: `url(${coverImgUrl})`}}>
                <img src={coverImgUrl}></img>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>{author} | {publisher}</div>
            <div className={style.description}>{description}</div>
        </div>
    );
}