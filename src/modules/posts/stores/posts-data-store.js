import { makeObservable, observable } from "mobx";

// services
import { PostsService } from "../services/posts.service";

export class PostsDataStore {
  posts = [];
  isLoading = true;

  constructor() {
    makeObservable(this, {
      posts: observable,
      isLoading: observable,
    })
  }

  async getPosts() {
    const response = await PostsService.getPosts();
    this.posts = response.data.results;
    this.isLoading = false;
  }
}
