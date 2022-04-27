import { PostsService } from "../services/posts.service";

export class ManagePostDataStore {
  managePostViewStore;

  constructor(managePostViewStore) {
    this.managePostViewStore = managePostViewStore;
  }

  async managePost(isEditMode) {
    if (this.managePostViewStore.isLoading) {
      return;
    }

    this.managePostViewStore.setIsLoading(true);

    const result = await this.managePostViewStore.form.validate();
    if (result.hasError) {
      return;
    }

    try {
      const data = {
        title: this.managePostViewStore.form.$.title.$,
        body: this.managePostViewStore.form.$.body.$,
        image: this.managePostViewStore.form.$.image.$,
      };

      let response;
      if (isEditMode) {
        response = await PostsService.updatePost(this.managePostViewStore.form.$.id.$, data);
      } else {
        response = await PostsService.createPost(data);
      }

      return response;
    } catch (err) {
      if (!!err.response) {
        this.managePostViewStore.setApiErrorMsg(err.response.data.message);
      } else {
        this.managePostViewStore.setApiErrorMsg('');
        alert('Unknown error occurred');
      }

      return null;
    } finally {
      this.managePostViewStore.setIsLoading(false);
    }
  }

  async getPostAndUpdateFormValues(id) {
    this.managePostViewStore.setIsLoading(true);

    try {
      const response = await PostsService.getPostById(id);
      this.managePostViewStore.setFormValues(response.data);
      this.managePostViewStore.setIsLoading(false);

      return response.data;
    } catch (err) {
      let message;
      if (!!err.response) {
        message = err.response.data.message;
      } else {
        message = 'Unknown error occurred'
      }

      // TODO: show error toastr
      alert(message);
      console.error(err);
    }
  }
}
