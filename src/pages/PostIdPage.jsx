import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });
  useEffect(() => {
    fetchPostById(id);
    fetchComments(id);
  }, []);
  return (
    <div>
      <h1>You open page with id = {id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Comments</h1>
      {isComLoading ? (
        <Loader />
      ) : (
        <div >
          {comments.map((comm) =>
            <div style={{marginBottom: '1rem'}} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
