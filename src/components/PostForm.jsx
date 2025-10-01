import { useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";


const PostForm = ({create}) => {
  const [post, setPost] = useState({ title: '', body: '' });
  
  //! const bodyInputRef = useRef() нужно => import { useRef } from "react";
  //! console.log(bodyInputRef.current.vsalue)
  const addNewPost = (e) => {
    e.preventDefault();

    const NewPost = {
        ...post, id: Date.now() 
    }

    create(NewPost)
    setPost({ title: '', body: '' });
  };

  return (
    <form>
      
      <MyInput //! Управляемый компонент 
        value={post.title}
        //todo добавляем новые данные title в объект post
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post name"
      />
      <MyInput
        value={post.body}
        //todo добавляем новые данные body в объект post
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post name"
      />
      {/* _НЕ_Управляемый компонент с использованием ref, 
        //!не можем его очищать после создания нового поста
        <MyInput ref={bodyInputRef} type="text" placeholder="Post Description" /> */}
      <MyButton onClick={addNewPost} disablet="true">
        <strong>Add Post</strong>
      </MyButton>
    </form>
  );
};

export default PostForm;
