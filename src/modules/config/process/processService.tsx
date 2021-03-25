import authAxios from 'src/modules/shared/axios/authAxios';

export default class CheckponitService {
  static async edit(data) {
    const body = {
      ...data,
    };

    const response = await authAxios.put(
      `/controlline/`,
      body,
    );
    return response.data;
  }
  
  static async doControlLineActive(){
    const response = await authAxios.get(
      '/controlline/active/',
    );

    return response.data;
  }

  static async doDisabled(id) {

    const response = await authAxios.delete(
      `/controlline/${id}`,
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      ...data,
    };

    const response = await authAxios.post(
      `/controlline/`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(
      `/controlline/${id}`,
    );
    return response.data;
  }

  static async fetchProcess(filter, size, page) {
    const params = {
      filter,
      size,
      page,
    };

    const response = await authAxios.get(
      `/controlline/`,
      {
        params,
      },
    );

    return response.data;
  }

  static async fetchProcessActive(){
      const response = await authAxios.get(
        '/controlline/active/',
        {
          params: {}
        }
      );
    
      return response.data;
  }

}
