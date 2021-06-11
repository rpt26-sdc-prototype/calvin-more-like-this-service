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

export default function () {

  var url = 'http://localhost:4022/morelikethis';
  var payload = JSON.stringify({
    tags:[ 'officia', 'irure', 'magna', 'nostrud', 'quis' ],
    similar:[468078, 2607466, 7021684, 7878965, 9039177, 5951755, 7399813, 7546880, 2985828, 7096522]
    },
  );
  var params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  http.post(url, payload, params);

  sleep(1);
}
