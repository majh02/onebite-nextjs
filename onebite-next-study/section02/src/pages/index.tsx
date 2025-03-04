// CSS Module
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css"
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-items";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // 반드시 객체를 반환해야함
  console.log("서버사이드프롭스에요!!"); // 서버에서만 실행됨. 브라우저에서는 실행되지 않음.

  const data = "hello";
  return { props: { data } };
};

export default function Home({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  // 컴포넌트가 마운트 된 이후에 실행되므로, 브라우저에서만 실행됨. 서버에서는 실행되지 않음.
  useEffect(() => {
    console.log(window);
  }, []);

  console.log(data); // 서버와 브라우저 모두 실행됨.

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
      </section>
    </div>
  );
}


Home.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
