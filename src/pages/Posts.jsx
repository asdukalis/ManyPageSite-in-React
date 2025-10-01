import { useRef, useEffect, useState } from "react";
import PostList from "../components/PostList.jsx";
import PostForm from "../components/PostForm.jsx";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePost } from "../hooks/usePosts.js";
import PostService from "../API/PostService.js";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching.js";
import { getPageCount } from "../utils/pages.js";
import Pagination from "../components/UI/pagination/Pagination.jsx";
import { useObserver } from "../hooks/useObserver.js";


export default function Posts() {
  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limitParam, pageParam) => {
    const response = await PostService.getAll(limitParam, pageParam);
    // console.log('response.headers:', response.headers);
    // console.log('x-total-count:', response.headers['x-total-count'] || response.headers['X-Total-Count']);
    setPosts(prevPosts => [...prevPosts, ...response.data]);
    const totalCount = response.headers['x-total-count'] || response.headers['X-Total-Count'];
    // console.log('totalCount:', totalCount, 'limit:', limitParam);
    setTotalPages(getPageCount(totalCount, limitParam));
  });
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const lastElement = useRef();
  const [page, setPage] = useState(1);


  // Лог для диагностики page и totalPages
  useEffect(() => {
    // console.log('page:', page, 'totalPages:', totalPages);
  }, [page, totalPages]);



//todo Intersection Observer для бесконечной прокрутки
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });
//todo Intersection Observer для бесконечной 

  // Загрузка постов при изменении страницы
  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]); // Добавлены зависимости

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
    // fetchPosts(limit, page);
    // Можно также сбросить посты при ручном изменении страницы
    // setPosts([]);
  };

  return (
    <div className="App">
      <MyButton style={{ margin: "1rem" }} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <PostFilter filter={filter} setFilter={setFilter} />
      
      {postError && 
        <h1 style={{ color: "red", display: "flex", justifyContent: "center" }}>
          An error occurred {postError}
        </h1>
      }
    
      {sortedAndSearchedPosts.length > 0 ? (
        <>
          <PostList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title={"Post list"}
          />
          <div ref={lastElement} style={{ height: 10, background: "transparent", margin: '20px 0', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            LOADER-TRIGGER
          </div>
        </>
      ) : (
        !isPostsLoading && <div>No posts found</div>
      )}
      
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
      
      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
}