const axios = require('axios');

module.exports.index = async (req, res) => {
  const {
    headers,
    body,
    query,
    method,
    url,
  } = req;

  console.log('method:  ', method);
  console.log('body:    ', body);
  console.log('headers: ', headers);

  headers.host = 'registry.npmjs.org';

  const npmInstance = axios.create({
    baseURL: 'http://registry.npmjs.com',
    headers,
  });

  npmInstance.interceptors.response
    .use((response) => response, (error) => Promise.resolve({ error }));

  const realUrl = url.substring(6);

  const response = await npmInstance({
    method,
    url: realUrl,
    data: body,
  });

  if (response.error) {
    console.log(response.error.response.data);
    console.log(response.error.response.status);
    return res
      .status(response.error.response.status)
      .json(response.error.response.data);
  }


  console.log(response.data);
  console.log(response.status);

  return res
    .status(response.status)
    .json(response.data);
};
