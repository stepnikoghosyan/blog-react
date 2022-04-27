import { BaseApiService } from "../../shared/services/base-api.service";
import { convertJsonToFormDataHelper } from "../../../utils/json-to-form-data.helper";

const BASE_ENDPOINT = 'posts';

export const PostsService = {
  getPosts: (queryParams) => {
    return BaseApiService.get(BASE_ENDPOINT, {
      params: {
        ...queryParams,
        showAll: true
      },
    })
      .then((response) => {
        return {
          ...response,
          data: {
            count: response.data.count,
            results: response.data.results.map((item) => {
              return {
                ...item,
                user: {
                  ...item.user,
                  fullName: `${ item.user.firstName } ${ item.user.lastName }`
                },
              };
            }),
          },
        };
      });
  },

  getPostById: (id) => {
    return BaseApiService.get(`${ BASE_ENDPOINT }/${ id }`)
      .then((response) => {
        return {
          ...response,
          data: {
            ...response.data,
            user: {
              ...response.data.user,
              fullName: `${ response.data.user.firstName } ${ response.data.user.lastName }`
            },
          },
        };
      });
  },

  createPost: (data) => {
    return BaseApiService.post(BASE_ENDPOINT, convertJsonToFormDataHelper(data));
  },

  updatePost: (postId, data) => {
    return BaseApiService.put(`${ BASE_ENDPOINT }/${ postId }`, convertJsonToFormDataHelper(data));
  },
};
