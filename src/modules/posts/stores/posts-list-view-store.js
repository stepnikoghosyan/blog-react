import { action, makeObservable, observable } from "mobx";

class _PostsListViewStore {
  isLoading = true;
  posts = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      posts: observable,
      setIsLoading: action,
      setPosts: action,
    })
  }

  setIsLoading(value) {
    this.isLoading = value;
  }

  setPosts(value) {
    this.posts = value || [];
  }
}

export const PostsListViewStore = new _PostsListViewStore();
