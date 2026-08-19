import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { AppError } from './AppError';

import { getToken } from '@/features/auth';

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
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message ?? error.message ?? 'Erro inesperado';

    const statusCode = error.response?.status ?? 500;
    const code = error.response?.data?.error ?? 'UNKNOWN_ERROR';

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
