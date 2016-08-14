import request from 'superagent';

import { apiRoot } from 'config';

export function post(resource, data) {
  return request
          .post(`${apiRoot}${resource}`)
          .set('Content-Type', 'application/json')
          .accept('application/json')
          .send(data);
}
