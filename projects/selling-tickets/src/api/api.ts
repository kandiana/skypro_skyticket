const backendDomain = 'http://lokalhost:5000';

export type TestResponse = {
  status: 'ok';
  token?: string
}

export const api = {
  test: async function () {
    const response = await fetch(`${backendDomain}/test`);

    const json = await response.json();

    return json;
  },
};
