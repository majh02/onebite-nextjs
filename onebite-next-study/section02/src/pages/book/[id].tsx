import fetchOneBook from "@/lib/fetch-one-book";
import style from "./[id].module.css";
import { 
    // GetServerSidePropsContext, 
    GetStaticPropsContext, 
    // InferGetServerSidePropsType, 
    InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//     const bookId = context.params!.id;
//     const book = await fetchOneBook(Number(bookId));

//     return {
//         props: {
//             book,
//         }
//     }
// }

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { id: "1" } },
            { params: { id: "2" } },
            { params: { id: "3" } },
        ],
        // fallback: false, // false: 404 Not Found 반환
        fallback: true, // true: 즉시 생성 + 페이지만 미리 반환
        // fallback: "blocking", // blocking: 즉시 생성(Like SSR)
    }    
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const bookId = context.params!.id;
    const book = await fetchOneBook(Number(bookId));

    if(!book) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            book,
        }
    }
}


export default function Page({
    book,
}: 
// InferGetServerSidePropsType<typeof getServerSideProps>
InferGetStaticPropsType<typeof getStaticProps>
) {

    const router = useRouter();
    if(router.isFallback) {
        return "로딩중...";
    } else if(!book) {
        return "문제가 발생했습니다. 다시 시도해주세요.";
    }

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