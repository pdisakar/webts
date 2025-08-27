import client from './network';

// Used
export async function getGlobalData() {
  return await client
    .get('/global')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

// Used
export async function getOptionsData() {
  return await client
    .get('/options')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

// Used
export async function getHomeData() {
  return await client
    .get('/homepage')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

// Used
export async function getArticle(query) {
  return await client
    .get(`/content/${query}`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

