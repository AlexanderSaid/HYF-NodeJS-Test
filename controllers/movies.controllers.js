import { v4 as uuidv4 } from "uuid";

let movies = [
  {
    id: "9791438e-97c4-49b9-aaab-dbb8aa2jg9bz",
    title: "Inception",
    director: "Christopher",
    release_date: "2010-07-16",
  },
  {
    id: "9791295e-97c4-49b9-ageb-dbb8aa2gd8so",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];

export const getAllMovies = (req, res) => {
  res.status(200);
  res.send(movies);
};

export const addMovie = (req, res) => {
  const { title, director, release_date } = req.body;
  if (!title || !director || !release_date) {
    res
      .status(400)
      .send({ msg: "Please fill all fields: Title, Director & Release date." });
    return;
  }

  const movieFound = movies.find(
    (movie) =>
      movie.title === title &&
      movie.director === director &&
      movie.release_date === release_date
  );

  if (movieFound) {
    res.status(400).send({
      msg: `This movie already exist in the database with id ${movieFound.id}`,
    });
  } else {
    const movieId = uuidv4();
    const movie = { id: movieId, title, director, release_date};
    movies.push(movie);
    res.status(201).send({
      msg: `The movie "${req.body.title}" is added to the list with id: ${movieId}`,
    });
  }
};

export const getMovie = (req, res) => {
  const { id } = req.params;

  const movieFound = movies.find((movie) => movie.id === id);

  if (!movieFound) {
    res.status(404).send({ msg: `There is no movie with id ${id}` });
  } else {
    res.status(200).send(movieFound);
  }
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;

  const movieFound = movies.find((movie) => movie.id === id);

  if (!movieFound) {
    res.status(404).send({ msg: `There is no movie with id ${id}` });
  } else {
    movies = movies.filter((movie) => movie.id !== id);
    res
      .status(201)
      .send({ msg: `The movie "${movieFound.title}" has been removed.` });
  }
};

export const updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, director, release_date } = req.body;
  if (!title && !director && !release_date) {
    res.status(400).send({
      msg: "Please fill a field to update: Title, Director or Release date.",
    });
    return;
  }
  const movieFound = movies.find((movie) => movie.id === id);

  if (!movieFound) {
    res.status(404).send({ msg: `There is no movie with id ${id}` });
  } else {
    if (title) movieFound.title = title;
    if (director) movieFound.director = director;
    if (release_date) movieFound.release_date = release_date;

    res.status(201).send({ msg: `Movie with id ${id} is updated` });
  }
};
