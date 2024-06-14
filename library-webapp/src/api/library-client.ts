import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookResponseDto } from './dto/book.dto';
import {
  LoanResponseDto,
  createLoanDto,
  getLoansPageResponseDto,
  getUserLoansDto,
} from './dto/loan.dto';
import {
  CreateReviewDto,
  ReviewResponseDto,
  ReviewResponseListDto,
} from './dto/review.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

const tokenId = 'token';
export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    console.log('LibraryClient');
    const token = localStorage.getItem(tokenId);
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

      localStorage.setItem(tokenId, response.data.token ?? '');

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
      const response: AxiosResponse<getLoansPageResponseDto> =
        await this.client.get(`/loan?userId=${userId}`);

      let loans: getUserLoansDto[] = response.data.loans || [];

      return {
        success: true,
        data: loans,
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

  public async getReview(
    bookId: number
  ): Promise<ClientResponse<ReviewResponseDto[] | null>> {
    try {
      const response: AxiosResponse<ReviewResponseDto[]> =
        await this.client.get(`/review/book/${bookId}`);

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

  public async postReview(data: CreateReviewDto) {
    try {
      const response: AxiosResponse<ReviewResponseDto> = await this.client.post(
        '/review',
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

  public async getMe() {
    try {
      const response = await this.client.get('/users/me');
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
