import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-items";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {

//     const q = context.query.q;
//     const books = await fetchBooks(q as string);

//     return { props: {
//         books,
//     } };
// }

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const q = context.query.q; // 빌드 타임엔 query가 없음
//     const books = await fetchBooks(q as string);
//     return { props: {
//         books,
//     } };
// }

export default function Page({
    // books,
}
// : InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const books = await fetchBooks(q as string);
        setBooks(books);
    }

    useEffect(() => {
        fetchSearchResult();
    }, [q]);

    return (
        <div>
            {books.map((book) => 
                <BookItem key={book.id} {...book} />
            )}
        </div>
    );
}

Page.getLayout = (page:ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}