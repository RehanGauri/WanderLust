const sampleReviews = [
  {
    comment: "Absolutely stunning views! The cottage was clean and comfortable.",
    rating: 5,
    createdAt: new Date("2023-05-15"),
    author: "685575afcd16f321d7052cc8", // RehanGauri
  },
  {
    comment: "Great location but the wifi was spotty.",
    rating: 4,
    createdAt: new Date("2023-06-20"),
    author: "685575bdcd16f321d7052ccd", // rehan
  },
  {
    comment: "Perfect location for exploring NYC!",
    rating: 5,
    createdAt: new Date("2023-04-10"),
    author: "68557ae7dba905eb38961506", // rehan123
  },
  {
    comment: "The perfect getaway from city life!",
    rating: 5,
    createdAt: new Date("2023-07-05"),
    author: "6856463c1c7ccd8ac5ea1c81", // rehangauri
  },
  {
    comment: "Beautiful but quite remote.",
    rating: 4,
    createdAt: new Date("2023-08-12"),
    author: "685690e0a02d6e36deb087ac", // random
  },
  {
    comment: "Like stepping back in time! Absolutely magical.",
    rating: 5,
    createdAt: new Date("2023-09-01"),
    author: "6857b8f5de8533c6d6ce05df", // gotiyasaur
  },
  {
    comment: "Unique experience! Kids loved it.",
    rating: 4,
    createdAt: new Date("2023-06-22"),
    author: "6855a1f9558cf6f2cd118409", // kuch
  },
  {
    comment: "Paradise indeed! Will definitely return.",
    rating: 5,
    createdAt: new Date("2023-08-15"),
    author: "68557afadba905eb3896150a", // ReHan123
  },
  {
    comment: "Perfect for our family fishing trip!",
    rating: 5,
    createdAt: new Date("2023-07-30"),
    author: "6857ba8cde8533c6d6ce0654", // nadir
  },
  {
    comment: "The views were worth every penny!",
    rating: 5,
    createdAt: new Date("2023-09-05"),
    author: "685575afcd16f321d7052cc8", // RehanGauri
  },
  {
    comment: "Amazing but quite expensive.",
    rating: 4,
    createdAt: new Date("2023-09-10"),
    author: "685575bdcd16f321d7052ccd", // rehan
  },
  {
    comment: "Perfect for ski enthusiasts!",
    rating: 5,
    createdAt: new Date("2023-02-15"),
    author: "68557ae7dba905eb38961506", // rehan123
  },
  {
    comment: "Once in a lifetime experience!",
    rating: 5,
    createdAt: new Date("2023-03-20"),
    author: "6856463c1c7ccd8ac5ea1c81", // rehangauri
  },
  {
    comment: "Charming and full of character!",
    rating: 5,
    createdAt: new Date("2023-04-25"),
    author: "685690e0a02d6e36deb087ac", // random
  },
  {
    comment: "Absolute paradise! Worth every penny.",
    rating: 5,
    createdAt: new Date("2023-01-10"),
    author: "6857b8f5de8533c6d6ce05df", // gotiyasaur
  },
  {
    comment: "Like something from a storybook!",
    rating: 5,
    createdAt: new Date("2023-05-18"),
    author: "6855a1f9558cf6f2cd118409", // kuch
  },
  {
    comment: "Beautiful historic property!",
    rating: 4,
    createdAt: new Date("2023-06-30"),
    author: "68557afadba905eb3896150a", // ReHan123
  },
  {
    comment: "Heaven on earth! Will definitely return.",
    rating: 5,
    createdAt: new Date("2023-07-22"),
    author: "6857ba8cde8533c6d6ce0654", // nadir
  },
  {
    comment: "The views were spectacular!",
    rating: 5,
    createdAt: new Date("2023-08-08"),
    author: "685575afcd16f321d7052cc8", // RehanGauri
  },
  {
    comment: "Great Art Deco style! Perfect location.",
    rating: 5,
    createdAt: new Date("2023-09-02"),
    author: "685575bdcd16f321d7052ccd", // rehan
  },
  {
    comment: "Absolutely perfect vacation!",
    rating: 5,
    createdAt: new Date("2023-03-15"),
    author: "68557ae7dba905eb38961506", // rehan123
  },
  {
    comment: "Magical experience staying in a real castle!",
    rating: 5,
    createdAt: new Date("2023-04-20"),
    author: "6856463c1c7ccd8ac5ea1c81", // rehangauri
  },
  {
    comment: "Unbelievable luxury in the desert!",
    rating: 5,
    createdAt: new Date("2023-05-25"),
    author: "685690e0a02d6e36deb087ac", // random
  },
  {
    comment: "Perfect digital detox location!",
    rating: 4,
    createdAt: new Date("2023-06-18"),
    author: "6857b8f5de8533c6d6ce05df", // gotiyasaur
  },
  {
    comment: "The most beautiful sunsets we've ever seen!",
    rating: 5,
    createdAt: new Date("2023-07-28"),
    author: "6855a1f9558cf6f2cd118409", // kuch
  },
  {
    comment: "Unique and eco-conscious! Loved it.",
    rating: 5,
    createdAt: new Date("2023-08-22"),
    author: "68557afadba905eb3896150a", // ReHan123
  },
  {
    comment: "Charming southern hospitality!",
    rating: 5,
    createdAt: new Date("2023-09-08"),
    author: "6857ba8cde8533c6d6ce0654", // nadir
  },
  {
    comment: "Perfect base for exploring Tokyo!",
    rating: 5,
    createdAt: new Date("2023-02-28"),
    author: "685575afcd16f321d7052cc8", // RehanGauri
  },
  {
    comment: "Peaceful and relaxing!",
    rating: 4,
    createdAt: new Date("2023-03-15"),
    author: "685575bdcd16f321d7052ccd", // rehan
  },
  {
    comment: "Most beautiful place on earth!",
    rating: 5,
    createdAt: new Date("2023-04-05"),
    author: "68557ae7dba905eb38961506", // rehan123
  },
  {
    comment: "Perfect ski vacation!",
    rating: 5,
    createdAt: new Date("2023-01-20"),
    author: "6856463c1c7ccd8ac5ea1c81", // rehangauri
  },
  {
    comment: "Perfect surf spot!",
    rating: 5,
    createdAt: new Date("2023-02-10"),
    author: "685690e0a02d6e36deb087ac", // random
  }
];

module.exports = sampleReviews;