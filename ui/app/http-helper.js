import request from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

import { apiRoot } from 'config';

export function post(resource, data) {
  return request
          .post(`${apiRoot}${resource}`)
          .use(superagentPromisePlugin)
          .set('Content-Type', 'application/json')
          .accept('application/json')
          .send(data)
          .end();
}
