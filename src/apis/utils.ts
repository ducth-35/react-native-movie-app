import isArray from 'lodash/isArray';
import {isNullOrEmpty} from '../utils';

export const getRequestUrl = (
  requestUrl: string,
  params?: any,
  queryString?: any,
) => {
  if (typeof params === 'object' && params) {
    if (params?.parentId) {
      requestUrl += '/' + params.parentId;
    }
    if (params?.partial) {
      requestUrl += '/' + params.partial;
    }
    if (params?.subId) {
      requestUrl += '/' + params.subId;
    }
    if (params?.action) {
      requestUrl += '/' + params.action;
    }
  }
  if (queryString && !isNullOrEmpty(queryString)) {
    return getQueryString(requestUrl, queryString);
  }

  return requestUrl;
};

export const getQueryString = (requestUrl: string, params?: any) => {
  if (typeof params === 'object' && params) {
    const ret: string[] = [];
    for (const d of Object.keys(params)) {
      if (isArray(params[d])) {
        const arrayParams: string = `${d}=${params[d].join(',')}`;
        ret.push(arrayParams);
      } else {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
      }
    }

    if (ret.length > 0) {
      const retString = ret.join('&');
      if (requestUrl.includes('?')) {
        requestUrl = requestUrl + '&' + retString;
      } else {
        requestUrl = requestUrl + '?' + retString;
      }
    }
  }
  return requestUrl;
};
