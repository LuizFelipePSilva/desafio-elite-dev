import type { User, CreateUserInput } from '../types';

import { apiGet, apiPost } from '@/shared/lib/httpClient';

export async function getUsers(): Promise<User[]> {
  return apiGet<User[]>('/users');
}

export async function getUserById(id: string): Promise<User> {
  return apiGet<User>(`/users/${id}`);
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return apiPost<User>('/users', data);
}
