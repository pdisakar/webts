import client from './network';
import { AxiosResponse } from 'axios';

export type ApiResponse<T = any> = Promise<AxiosResponse<T>>;


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

// Blog page API
export async function getBlogPage(): ApiResponse {
  try {
    const res = await client.get(`/pagecontent/blogpage?_limit=6`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}

// Blog by slug API
export async function getBlogBySlug(query: string | number): ApiResponse {
  try {
    const res = await client.get(`/blogcontent/${query}`);
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
}
