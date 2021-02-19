import authAxios from 'src/modules/shared/axios/authAxios';

export default class CheckponitService {
  static async edit(data) {
    const body = {
      data,
    };

    const response = await authAxios.put(
      `/controlline`,
      body,
    );
    return response.data;
  }

  static async doDisabled(ids) {
    const params = {
      ids,
    };

    const response = await authAxios.put(
      `/disable/controlline`,
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

  static async fetchProcess(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/controlline/`,
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
