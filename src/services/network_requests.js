import client from './network';

export async function getGlobalData() {
  return await client
    .get('/global')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getOptionsData() {
  return await client
    .get('/options')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getHomeData() {
  return await client
    .get('/homepage')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getPackage(query) {
  return await client
    .get(`/packagecontent/${query}`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getContactPage() {
  return await client
    .get('/pagecontent/contactpage')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getBlogPage() {
  return await client
    .get(`/pagecontent/blogpage?_limit=6`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getBlogBySlug(query) {
  return await client
    .get(`/blogcontent/${query}`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}
export async function getAllTestimonials() {
  return await client
    .get('/alltestimonials')
    .then(async res => {
      return res;
    })
    .catch(err => err);
}

export async function getAllBlog() {
  return await client
    .get(`/allblogs`)
    .then(async res => {
      return res;
    })
    .catch(err => err);
}
