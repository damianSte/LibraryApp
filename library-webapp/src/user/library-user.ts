import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export type UserResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

const userInfo = 'userInfo';

export class LibraryUser {
  private user: AxiosInstance;
  constructor() {
    console.log('LibraryUser');
    const user = localStorage.getItem(userInfo);
    this.user = axios.create({
      headers: {
        Auth: `User Info ${user}`,
      },
    });
  }

  public async getMe() {
    try {
      const response = await this.user.get('/users/me');

      this.user.defaults.headers.common[
        'Auth'
      ] = `User info ${response.data.user}`;

      localStorage.setItem(userInfo, response.data.user);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
