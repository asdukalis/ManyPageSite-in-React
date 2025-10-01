import PostItem from "./PostItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function PostList({ posts, title, remove }) {
  // console.log(posts)
  
  if (!posts.length) {
    return (
      <h1
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          height: "100vh",
          color: "red",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        Not found posts !
      </h1>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index, nodeRef) => (
          <CSSTransition
              key={post.id}
              nodeRef={nodeRef}
              timeout={500}
              classNames="post"
            >
          <PostItem
            ref={nodeRef}
            remove={remove}
            number={index + 1}
            post={post}
          />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
}
