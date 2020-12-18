import http from 'k6/http';

export let  options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 10 },
  ],
  rps: 1000,
};

export default function () {
  var url = `http://13.52.248.200:80/api/gallery/${Math.floor(Math.random()*10000000)}/homesData`;
  http.get(url);
}
