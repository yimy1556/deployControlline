import authAxios from 'src/modules/shared/axios/authAxios';

export default class ControlTypeService {

  static async fetchCheckpoint(filter, limit) {
    const params = {
      filter,
      limit,
    };

    const response = await authAxios.get(
      `/controltype/`,
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
