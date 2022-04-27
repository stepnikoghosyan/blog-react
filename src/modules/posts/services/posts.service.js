import { BaseApiService } from "../../shared/services/base-api.service";

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
                }
              };
            }),
          }
        }
      });
  },
};
