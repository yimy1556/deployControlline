import authAxios from 'src/modules/shared/axios/authAxios';

export default class CategoryService {

  static async fetchCheckpoint(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/category/`,
      {
        params,
      },
    );

    return response.data;
  }
}
