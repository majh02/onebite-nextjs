import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"
import { ReactNode } from "react";
import BookItem from "@/components/book-items";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// SSG
export const getStaticProps = async () => {
  // 빌드 시 한번만 실행되는 함수
  // 반드시 객체를 반환해야함

  console.log("인덱스 페이지");

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ])
  
  return { 
    props: {
      allBooks,
      recoBooks,
   },
  };
}

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
    <Head>
      <title>한입북스</title>
      <meta property="og:image" content="/thumbnail.png" />
      <meta property="og:title" content="한입북스" />
      <meta 
        property="og:description" 
        content="한입 북스에 등록된 도서를 만나보세요" 
      />
    </Head>

      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>

        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  );
}


Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
