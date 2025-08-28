// api.ts
import client from './network';
import { AxiosResponse } from 'axios';

type ApiResponse<T = any> = Promise<AxiosResponse<T>>;

// Used
export async function getGlobalData(): ApiResponse {
  try {
    return await client.get('/global');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getOptionsData(): ApiResponse {
  try {
    return await client.get('/options');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getHomeData(): ApiResponse {
  try {
    return await client.get('/homepage');
  } catch (err) {
    return Promise.reject(err);
  }
}

// Used
export async function getArticle(query: string | number): ApiResponse {
  try {
    return await client.get(`/content/${query}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
