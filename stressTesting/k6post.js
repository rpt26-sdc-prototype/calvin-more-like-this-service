import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 1 }, // Get up to 1 rps
    { duration: '2m', target: 1 }, // stay there for 2 minutes
    { duration: '2m', target: 10 }, // get up to 10rps
    { duration: '2m', target: 10 }, // stay
    { duration: '2m', target: 100 }, // get up to 100 rps
    { duration: '2m', target: 100 }, // stay
    { duration: '2m', target: 1000 }, // get up to 1000 rps
    { duration: '2m', target: 1000 }, // stay
    { duration: '5m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function() {
  const BASE_URL = 'http://localhost:4022'; // make sure this is not production
  // let response = http.get(BASE_URL);
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/1/`,
    ],
  ]);
  sleep(1);
}
