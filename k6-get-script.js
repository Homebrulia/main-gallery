import http from 'k6/http';

export let  options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 1000 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 10 },
  ],
  rps: 1000,
};

export default function () {
  var url = `http://localhost:8040/api/gallery/${Math.floor(Math.random()*10000000)}/homesData`;
  http.get(url);
}
