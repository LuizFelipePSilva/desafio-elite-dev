import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { AppError } from './AppError';

interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}

const httpClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    let message = error.message || 'Erro inesperado';
    let statusCode = 500;
    let code = 'UNKNOWN_ERROR';

    if (error.response) {
      message = error.response.data.message || message;
      statusCode = error.response.status;
      code = error.response.data.error || code;
    }

    throw new AppError(message, statusCode, code);
  },
);

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await httpClient.get<T>(url, config);
  return data;
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await httpClient.post<T>(url, body, config);
  return data;
}

export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await httpClient.patch<T>(url, body, config);
  return data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await httpClient.delete<T>(url, config);
  return data;
}

export { httpClient };
