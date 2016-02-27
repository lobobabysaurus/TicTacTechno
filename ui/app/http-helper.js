import request from 'superagent';

export function post(resource, data) {
  return new Promise((accept, reject) => {
    request
      .post(`http://127.0.0.1:5000/api/${resource}`)
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
