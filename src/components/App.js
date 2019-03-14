import React, { Component } from "react";

import "./App.css";

import Post from "./Post/Post";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import axios from "axios";
const url = "https://practiceapi.devmountain.com/api/posts";
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(url)
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.log(err));
  }
  updatePost(id, text) {
    axios.put(`${url}?id=${id}`, { text }).then((res) => {
      this.setState({ posts: res.data });
    });
  }

  deletePost(id) {
    axios.delete(`${url}?id=${id}`).then((res) => {
      this.setState({ posts: res.data });
    });
  }

  createPost(id, text) {
    axios.post(`${url}?id=${id}`, { text }).then((res) => {
      this.setState({ posts: res.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map((ele) => (
            <Post
              key={ele.id}
              text={ele.text}
              date={ele.date}
              id={ele.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
