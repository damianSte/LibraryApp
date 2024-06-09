import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './login.dto';
import { BookResponseDto } from './book.dto';
import { LoanResponseDto, createLoanDto, getUserLoansDto } from './loan.dto';
import { UserDetails } from '../auth-context/authTypes';
import { dark } from '@mui/material/styles/createPalette';

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
        '/auth/login',
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

  public async getBooks(): Promise<ClientResponse<BookResponseDto[] | null>> {
    try {
      const response: AxiosResponse<BookResponseDto[]> = await this.client.get(
        '/books'
      );
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

  public async getUserLoans(
    userId: number
  ): Promise<ClientResponse<getUserLoansDto[] | null>> {
    try {
      const response: AxiosResponse<getUserLoansDto[]> = await this.client.get(
        `/loan?userId=${userId}`
      );
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: [],
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async postLoan(
    data: createLoanDto
  ): Promise<ClientResponse<LoanResponseDto | null>> {
    try {
      const response: AxiosResponse<LoanResponseDto> = await this.client.post(
        `/loan`,
        data
      );
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
  public async userInfo(): Promise<ClientResponse<UserDetails | null>> {
    try {
      const response: AxiosResponse<UserDetails> = await this.client.get(
        '/user'
      );
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
  public async getReviewByBookId(bookId: number) {
    try {
      const response = await this.client.get(`/reviews/book/${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
