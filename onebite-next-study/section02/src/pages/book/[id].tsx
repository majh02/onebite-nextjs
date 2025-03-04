import style from "./[id].module.css";
import books from "@/mock/books.json";
import { title } from 'process';

const mockData = books[0];

export default function Page() {
    const {
        id, 
        title, 
        subTitle, 
        description, 
        author, 
        publisher, 
        coverImgUrl
    } = mockData;

    return (
        <div className={style.container}>
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