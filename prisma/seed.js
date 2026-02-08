import { prisma } from "../src/config/db.js";

const userId = "e15fd9ca-5980-4a64-9719-d999ee83ec35";

const movies = [
  {
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://example.com/forrestgump.jpg",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over a number of years, finding solace and redemption through acts of decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A skilled thief leads a team into people's dreams to steal secrets from their subconscious.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Action"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "Titanic",
    overview: "A love story unfolds aboard the ill-fated RMS Titanic.",
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    runtime: 195,
    posterUrl: "https://example.com/titanic.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces the Joker, a criminal mastermind who seeks to plunge Gotham City into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime"],
    runtime: 152,
    posterUrl: "https://example.com/darkknight.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "Gladiator",
    overview:
      "A former Roman general seeks revenge against the corrupt emperor who murdered his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "The Pursuit of Happyness",
    overview:
      "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    releaseYear: 2006,
    genres: ["Drama", "Biography"],
    runtime: 117,
    posterUrl: "https://example.com/pursuit.jpg",
    createdBy: userId,
  },
  {
    title: "La La Land",
    overview:
      "An aspiring actress and a dedicated musician fall in love while pursuing their dreams in Los Angeles.",
    releaseYear: 2016,
    genres: ["Drama", "Romance", "Music"],
    runtime: 128,
    posterUrl: "https://example.com/lalaland.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
  }
  console.log("Seeding completed.");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
