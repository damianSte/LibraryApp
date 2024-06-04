import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './login.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    console.log('LibraryClient');
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
  }

  public async login(
    data: LoginDto
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/login',
        data
      );
      this.client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

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

  public async getBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/books');
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
