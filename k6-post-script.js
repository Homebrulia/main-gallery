import http from 'k6/http';

export let options = {
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
  let url = `http://localhost:8040/api/gallery/homesData`;
  let listing_id = 20000000 + Math.floor(Math.random() * 10000000);
  let payload = {
    listing_id: listing_id,
    user_id: 25057,
    agent_id: 287093,
    sale: true,
    pending: true,
    new: false,
    construction: false,
    petFriendly: true,
    address: "3534 Kris Ridges, South Theoview, Pennsylvania 48560",
    price: 365.41,
    bed: 3,
    bath: 2,
    images: [
      "https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home24.jpg",
      "https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home18.jpg",
      "https://maingallerysdcproject.s3-us-west-1.amazonaws.com/home1.jpg"
    ],
    schools: [],
    crime: 2
  };
  http.post(url, payload);
}
