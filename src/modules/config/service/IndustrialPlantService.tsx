import authAxios from 'src/modules/shared/axios/authAxios';

export default class IndustrialPlantService {

  static async fetchIndustrialPlant() {

    const response = await authAxios.get(
      `/IndustrialPlant/`,
      {},
    );

    return response.data;
  }
}
