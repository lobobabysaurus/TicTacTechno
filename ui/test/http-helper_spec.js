import request from 'superagent';
import mocker from 'superagent-mocker';

import { apiRoot } from 'config';
import { post } from 'http-helper';
import { APIError } from 'test_utils';

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

    post(resource, payload).should.eventually.become(payload).notify(done);
  });

  it('should pass error data through on failed call', (done) => {
    const payload = {'some': 'test', 'payload': 'irrelevant'};

    const resource = 'test/';

    const postErrors = {some: "issue here", another: "issue here"};
    requestMock.post(`${apiRoot}${resource}`, () => {
      throw new APIError(postErrors);
    });

    post(resource, payload).catch((errors) => {
      errors.should.deep.equal({response: { text: JSON.stringify(postErrors)}});
      done();
    });
  });
});
