import authAxios from 'src/modules/shared/axios/authAxios';

export default class CheckponitService {
  static async edit(data) {
    const body = {
      ...data,
    };

    const response = await authAxios.put(
      `/checkpoint/`,
      body,
    );
    return response.data;
  }

  static async doDisabled(id) {

    const response = await authAxios.delete(
      `/checkpoint/${id}`,
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      ...data,
    };

    const response = await authAxios.post(
      `/checkpoint/`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(
      `/checkpoint/${id}`,
    );
    return response.data;
  }

  static async fetchCheckpoint(filter, size, page) {
    const params = {
      filter,
      size,
      page,
    };
  
    const response = await authAxios.get(
      `/checkpoint/`,
      {
        params,
      },
    );

    return response.data;
  }
  
  static async fetchCheckpointActive(){
      const response = await authAxios.get(
        '/checkpoint/active/',
        {
          params: {}
        }
      );
    
      return response.data;
  }


  /*
    static async fetchUserAutocomplete(query, limit) {
      const params = {
        query,
        limit,
      };
  
      const response = await authAxios.get(
        `/user/autocomplete`,
        {
          params,
        },
      );
      return response.data;
      }*/
}
