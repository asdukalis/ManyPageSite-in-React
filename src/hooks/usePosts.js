import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  //! Формирует массив отсортированых постов
  const sortedPosts = useMemo(() => {
    // console.log('did it')
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};
//! возвращает отфильтрованный и отсортированный массив
export const usePost = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) =>
            post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
    }, [query, sortedPosts]);
    return sortedAndSearchedPosts
};
