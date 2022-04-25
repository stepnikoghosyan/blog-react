import { action, makeObservable, observable } from "mobx";

export class PostsDataStore {
  posts = [];

  constructor() {
    makeObservable(this, {
      posts: observable,
      setPosts: action,
    })
  }

  setPosts(data) {
    this.posts = data || [];
  }
}
