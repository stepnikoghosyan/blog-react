import { action, makeObservable, observable } from "mobx";

// services
import { PostsService } from "../services/posts.service";

export class PostsDataStore {
  posts = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      posts: observable,
      isLoading: observable,
      setIsLoading: action,
      setPosts: action,
    })
  }

  async getPosts(queryParams) {
    this.setPosts([]);
    this.setIsLoading(true);

    let data;

    try {
      const response = await PostsService.getPosts(queryParams);
      data = response.data.results;
    } catch (err) {
      data = [];

      let message;
      if (!!err.response) {
        message = err.response.data.message || 'Unknown Error Occurred';
      } else {
        message = 'Unknown Error Occurred';
      }

      // TODO: show error toastr
      alert(message);
    } finally {
      this.setPosts(data);
      this.setIsLoading(false);
    }
  }

  setIsLoading(value) {
    this.isLoading = value;
  }

  setPosts(data) {
    this.posts = data || [];
  }
}
