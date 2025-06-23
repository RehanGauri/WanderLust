const sampleReviews = [
  {
    comment: "Absolutely stunning views! The cottage was clean and comfortable.",
    rating: 5,
    createdAt: new Date("2023-05-15"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Great location but the wifi was spotty.",
    rating: 4,
    createdAt: new Date("2023-06-20"),
    author: "68597ac3ba7ec1771d3f9646", // rehan
  },
  {
    comment: "Perfect location for exploring NYC!",
    rating: 5,
    createdAt: new Date("2023-04-10"),
    author: "6859815ed2c63d4040f26f31", // rehan1234
  },
  {
    comment: "The perfect getaway from city life!",
    rating: 5,
    createdAt: new Date("2023-07-05"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Beautiful but quite remote.",
    rating: 4,
    createdAt: new Date("2023-08-12"),
    author: "68597afeba7ec1771d3f964b", // random
  },
  {
    comment: "Like stepping back in time! Absolutely magical.",
    rating: 5,
    createdAt: new Date("2023-09-01"),
    author: "68597afeba7ec1771d3f964b", // random (original was gotiyasaur, replaced with random)
  },
  {
    comment: "Unique experience! Kids loved it.",
    rating: 4,
    createdAt: new Date("2023-06-22"),
    author: "68597a20ba7ec1771d3f9638", // Rehan123 (original was kuch, replaced with Rehan123)
  },
  {
    comment: "Paradise indeed! Will definitely return.",
    rating: 5,
    createdAt: new Date("2023-08-15"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123
  },
  {
    comment: "Perfect for our family fishing trip!",
    rating: 5,
    createdAt: new Date("2023-07-30"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123 (original was nadir, replaced with ReHan123)
  },
  {
    comment: "The views were worth every penny!",
    rating: 5,
    createdAt: new Date("2023-09-05"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Amazing but quite expensive.",
    rating: 4,
    createdAt: new Date("2023-09-10"),
    author: "68597ac3ba7ec1771d3f9646", // rehan
  },
  {
    comment: "Perfect for ski enthusiasts!",
    rating: 5,
    createdAt: new Date("2023-02-15"),
    author: "6859815ed2c63d4040f26f31", // rehan1234
  },
  {
    comment: "Once in a lifetime experience!",
    rating: 5,
    createdAt: new Date("2023-03-20"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Charming and full of character!",
    rating: 5,
    createdAt: new Date("2023-04-25"),
    author: "68597afeba7ec1771d3f964b", // random
  },
  {
    comment: "Absolute paradise! Worth every penny.",
    rating: 5,
    createdAt: new Date("2023-01-10"),
    author: "68597afeba7ec1771d3f964b", // random (original was gotiyasaur, replaced with random)
  },
  {
    comment: "Like something from a storybook!",
    rating: 5,
    createdAt: new Date("2023-05-18"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123 (original was kuch, replaced with ReHan123)
  },
  {
    comment: "Beautiful historic property!",
    rating: 4,
    createdAt: new Date("2023-06-30"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123
  },
  {
    comment: "Heaven on earth! Will definitely return.",
    rating: 5,
    createdAt: new Date("2023-07-22"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123 (original was nadir, replaced with ReHan123)
  },
  {
    comment: "The views were spectacular!",
    rating: 5,
    createdAt: new Date("2023-08-08"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Great Art Deco style! Perfect location.",
    rating: 5,
    createdAt: new Date("2023-09-02"),
    author: "68597ac3ba7ec1771d3f9646", // rehan
  },
  {
    comment: "Absolutely perfect vacation!",
    rating: 5,
    createdAt: new Date("2023-03-15"),
    author: "6859815ed2c63d4040f26f31", // rehan1234
  },
  {
    comment: "Magical experience staying in a real castle!",
    rating: 5,
    createdAt: new Date("2023-04-20"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Unbelievable luxury in the desert!",
    rating: 5,
    createdAt: new Date("2023-05-25"),
    author: "68597afeba7ec1771d3f964b", // random
  },
  {
    comment: "Perfect digital detox location!",
    rating: 4,
    createdAt: new Date("2023-06-18"),
    author: "68597afeba7ec1771d3f964b", // random (original was gotiyasaur, replaced with random)
  },
  {
    comment: "The most beautiful sunsets we've ever seen!",
    rating: 5,
    createdAt: new Date("2023-07-28"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123 (original was kuch, replaced with ReHan123)
  },
  {
    comment: "Unique and eco-conscious! Loved it.",
    rating: 5,
    createdAt: new Date("2023-08-22"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123
  },
  {
    comment: "Charming southern hospitality!",
    rating: 5,
    createdAt: new Date("2023-09-08"),
    author: "68597a20ba7ec1771d3f9638", // ReHan123 (original was nadir, replaced with ReHan123)
  },
  {
    comment: "Perfect base for exploring Tokyo!",
    rating: 5,
    createdAt: new Date("2023-02-28"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Peaceful and relaxing!",
    rating: 4,
    createdAt: new Date("2023-03-15"),
    author: "68597ac3ba7ec1771d3f9646", // rehan
  },
  {
    comment: "Most beautiful place on earth!",
    rating: 5,
    createdAt: new Date("2023-04-05"),
    author: "6859815ed2c63d4040f26f31", // rehan1234
  },
  {
    comment: "Perfect ski vacation!",
    rating: 5,
    createdAt: new Date("2023-01-20"),
    author: "68597a4bba7ec1771d3f963f", // rehangauri
  },
  {
    comment: "Perfect surf spot!",
    rating: 5,
    createdAt: new Date("2023-02-10"),
    author: "68597afeba7ec1771d3f964b", // random
  }
];

module.exports = sampleReviews;