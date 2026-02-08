import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  // verify movie exists
  const movie = await prisma.movie.findUnique({ where: { id: movieId } });
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // check if already in watchlist
  const existInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });
  if (existInWatchlist) {
    return res.status(400).json({ message: "Movie already in watchlist" });
  }

  // add to watchlist
  const watchlistItem = await prisma.watchlistItem.create({
    userId,
    movieId,
    status: status || "Plan to Watch",
    rating,
    notes,
  });

  return res.status(201).json({
    status: "success",
    data: watchlistItem,
  });
};

export { addToWatchlist };
