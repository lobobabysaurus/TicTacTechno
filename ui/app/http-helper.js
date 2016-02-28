import request from 'superagent';

import { apiRoot } from 'config';

export function post(resource, data) {
  return new Promise((accept, reject) => {
    request
      .post(`${apiRoot}${resource}`)
      .set('Content-Type', 'application/json')
      .accept('application/json')
      .send(data)
      .end((error, response) => {
        if(error) {
          reject(error);
        }
        else {
          accept(response);
        }
      });
  });
}
