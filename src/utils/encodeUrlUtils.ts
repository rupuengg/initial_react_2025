const REQUEST_CHECK_REPLACE_REGX = /[^/]+/g;
const REQUEST_CHECK_REGX = /^\??(?:[^=&]+=[^&]+&?)+$/;

const encodeURIComponentEscapeSlash = (input: string) => {
  return input.replace(REQUEST_CHECK_REPLACE_REGX, match => encodeURIComponent(match));
};

export const encodeUrl = (input: string) => {
  const urlParts = input.split('?');
  const endpoint = urlParts[0];
  const queryParams = urlParts.slice(1).join('?');
  const encodedEndpoint = encodeURIComponentEscapeSlash(endpoint);

  // Check if the URL has query parameters in the specified format
  const isRequestParams = REQUEST_CHECK_REGX.test(queryParams);
  if (isRequestParams) {
    // Encode query parameters
    const encodedQueryParams = queryParams
      .split('&')
      .map(param => {
        const [key, value] = param.split('=');
        const encodedKey = encodeURIComponentEscapeSlash(key);
        const encodedValue = encodeURIComponentEscapeSlash(value);
        return `${encodedKey}=${encodedValue}`;
      })
      .join('&');
    return `${encodedEndpoint}?${encodedQueryParams}`;
  } else {
    // Encode the entire URL
    return encodeURIComponentEscapeSlash(input);
  }
};
