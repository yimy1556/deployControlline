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
    const params = {
      id,
    };

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

  static async fetchCheckpoint(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/checkpoint/`,
      {
        params,
      },
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
