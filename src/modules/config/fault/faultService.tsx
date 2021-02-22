import authAxios from 'src/modules/shared/axios/authAxios';

export default class FaultService {
  static async edit(data) {
    const body = {
      data,
    };

    const response = await authAxios.put(
      `/falla/`,
      body,
    );
    return response.data;
  }

  static async disable(ids) {
    const params = {
      ids,
    };

    const response = await authAxios.put(
      `/disable/falla/`,
      {
        params,
      },
    );

    return response.data;
  }

  static async create(data) {
    const body = {
      ...data,
    };
    console.log(body)
    const response = await authAxios.post(
      `/falla/`,
      body,
    );

    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(
      `/falla/${id}`,
    );
    return response.data;
  }

  static async fetchFault(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/falla/`,
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
