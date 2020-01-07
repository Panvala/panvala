import axios from 'axios';

export const request = async (args) => {
  console.log(`Api Request: ${JSON.stringify(args)}`);
  const options = {
    method: args.method,
    url: args.url
  };
  if (args.body !== 'undefined') {
    options.data = args.body;
  }
  if (args.headers !== 'undefined') {
    options.headers = args.headers;
  }
  return axios(options)
  .then((response) => {
    console.log(`Api Response: ${JSON.stringify(response.data)}`);
    return response;
  })
  .catch((error) => {
    console.log(`Api Error: ${error.message}`);
    return error;
  });
};
