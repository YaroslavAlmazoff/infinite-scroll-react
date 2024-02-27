import React, { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts } from "./api";
import Loader from "./Loader";
import "./App.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      !isLast && setLoading(true);
      const response = await getPosts(page);
      console.log(response);
      setPosts((prev) =>
        response.data.posts
          ? [...prev, ...response.data.posts].slice(0, response.data.count)
          : prev.slice(0, response.data.count)
      );
      setIsLast(response.data.isLast);
      setLoading(false);
    };
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= pageHeight) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    const getFirstUsers = async () => {
      setLoading(true);
      const response = await getPosts(1);
      setPosts(response.data.posts);
      setLoading(false);
    };
    if (posts.length === 0) {
      getFirstUsers();
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading ? <Loader ml={"0%"} /> : <></>}
    </div>
  );
};

export default App;
