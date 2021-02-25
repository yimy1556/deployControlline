import authAxios from 'src/modules/shared/axios/authAxios';

export default class TypeFallaService {

  static async fetchTypeFalla(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/typefalla/`,
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
