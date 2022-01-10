import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//! Test Get
describe("GET /", () => {
  it("Respond with html", async () => {
    const res = await request.get("/");

    expect(res.statusCode).toBe(200);

    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
  });
});

//! Test GET /movies
describe("GET /movies", () => {
  describe("User send a get request", () => {
    it("Respond with a 200 status code", async () => {
      const res = await request.get("/movies");

      expect(res.statusCode).toBe(200);
    });

    it("Should specify json in the content type header", async () => {
      const res = await request.get("/movies");

      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    it("Should send an object", async () => {
      const res = await request.get("/movies");

      expect(typeof res.body).toBe("object");
    });
  });
});

//!Test POST /movies
describe("POST /movies", () => {
  describe("User send a valid request", () => {
    const movieTest = {
      title: "Before Sunset",
      director: "Richard Linklater",
      release_date: "2004-02-10",
    };
    it("Respond with a 200 status code and send an object", async () => {
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(201);
      expect(typeof res.body).toBe("object");
    });
  });

  describe("User send an invalid request", () => {
    it("Request doesn't contain 'title' Respond with 400 status code", async () => {
      const movieTest = {
        director: "Richard Linklater",
        release_date: "2004-02-10",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(400);
    });
    it("Request doesn't contain 'title' Respond with error message", async () => {
      const movieTest = {
        director: "Richard Linklater",
        release_date: "2004-02-10",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.body.msg).toBe(
        "Please fill all fields: Title, Director & Release date."
      );
    });
    it("Request doesn't contain 'director' Respond with 400 status code", async () => {
      const movieTest = {
        title: "Before Sunset",
        release_date: "2004-02-10",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(400);
    });
    it("Request doesn't contain 'director' Respond with error message", async () => {
      const movieTest = {
        title: "Before Sunset",
        release_date: "2004-02-10",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.body.msg).toBe(
        "Please fill all fields: Title, Director & Release date."
      );
    });
    it("Request doesn't contain 'release date' Respond with 400 status code", async () => {
      const movieTest = {
        title: "Before Sunset",
        director: "Richard Linklater",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(400);
    });
    it("Request doesn't contain 'release date' Respond with error message", async () => {
      const movieTest = {
        title: "Before Sunset",
        director: "Richard Linklater",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.body.msg).toBe(
        "Please fill all fields: Title, Director & Release date."
      );
    });
  });
  describe("User try to add an already exist movie", () => {
    it("Respond with a 400 status code and an object", async () => {
      const movieTest = {
        title: "Inception",
        director: "Christopher",
        release_date: "2010-07-16",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(400);
      expect(typeof res.body).toBe("object");
    });
  });
});

//! Test GET /movies/:id
describe("Get /movies/:id", () => {
  describe("User send a valid ID", () => {
    it("Respond with a 200 status code and send back the movie object", async () => {
      const id = "9791295e-97c4-49b9-ageb-dbb8aa2gd8so";
      const res = await request.get(`/movies/${id}`);

      expect(res.statusCode).toBe(200);
      expect(typeof res.body).toBe("object");
      expect(res.body).toEqual({
        id: "9791295e-97c4-49b9-ageb-dbb8aa2gd8so",
        title: "The Irishman",
        director: "Martin Scorsese",
        release_date: "2019-09-27",
      });
    });
  });
  describe("User send invalid ID", () => {
    it("Respond with a 404 status code and with error message", async () => {
      const id = "76679071";
      const res = await request.get(`/movies/${id}`);

      expect(res.statusCode).toBe(404);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(`There is no movie with id ${id}`);
    });
  });
});

//! Test DELETE /movies/:id
describe("DELETE /movies/:id", () => {
  describe("User send a valid ID", () => {
    it("Respond with a 201 status code and a confirmation message", async () => {
      const id = "9791295e-97c4-49b9-ageb-dbb8aa2gd8so";
      const res = await request.delete(`/movies/${id}`);

      expect(res.statusCode).toBe(201);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(
        `The movie "The Irishman" has been removed.`
      );
    });
  });
  describe("User send invalid ID", () => {
    it("Respond with a 404 status code and an error message", async () => {
      const id = "376502";
      const res = await request.delete(`/movies/${id}`);

      expect(res.statusCode).toBe(404);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(`There is no movie with id ${id}`);
    });
  });
});

//! Test PATCH /movies/:id
describe("PATCH /movies/:id", () => {
  describe("User send invalid data", () => {
    // Sending empty or wrong data
    it("Respond with a 400 status code and an error message", async () => {
      const id = "9791438e-97c4-49b9-aaab-dbb8aa2jg9bz";

      const res = await request.patch(`/movies/${id}`).send({});

      expect(res.statusCode).toBe(400);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(
        "Please fill a field to update: Title, Director or Release date."
      );
    });
    // Sending invalid id
    it("Respond with a 404 status code and an error message", async () => {
      const id = "376502";

      const res = await request.patch(`/movies/${id}`).send({
        title: "Before Sunset",
      });

      expect(res.statusCode).toBe(404);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(`There is no movie with id ${id}`);
    });
  });

  describe("User send a valid data", () => {
    it("Respond with 201 status code and confirm message", async () => {
      const id = "9791438e-97c4-49b9-aaab-dbb8aa2jg9bz";
      const res = await request.patch(`/movies/${id}`).send({
        director: "Christopher Nolan",
      });

      expect(res.statusCode).toBe(201);
      expect(typeof res.body).toBe("object");
      expect(res.body.msg).toEqual(
        `Movie with id ${id} is updated`
      );
    });
  });
});
