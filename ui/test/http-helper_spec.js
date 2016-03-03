import chai from 'chai';
import request from 'superagent';
import mocker from 'superagent-mocker';

import { apiRoot } from 'config';
import { post } from 'http-helper';

describe('HTTP Helper', () => {
  let requestMock;
  before(() => {
    requestMock = mocker(request);
  });

  it('should pass post data through to the specified resource', (done) => {
    const payload = {'some': 'test', 'payload': 'irrelevant'};

    const resource = 'test/';

    requestMock.post(`${apiRoot}${resource}`, (req) => {
      return req.body;
    });

    post(resource, payload).then((response) => {
      response.should.deep.equal(payload);
      done();
    });
  });
});
