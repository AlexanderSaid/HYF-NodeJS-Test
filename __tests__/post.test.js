import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//!Test POST /movies
describe("POST /movies", () => {
  describe("User send a valid request", () => {
    it("Respond with a 201 status code and send an object", async () => {
      const movieTest = {
        title: "Before Sunset",
        director: "Richard Linklater",
        release_date: "2004-02-10",
      };
      const res = await request.post("/movies").send(movieTest);
      expect(res.statusCode).toBe(201);
      expect(typeof res.body).toBe("object");
      expect(res.body).toHaveProperty('msg');
      expect(typeof res.body.msg).toBe('string');
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
        "Please fill all fields: title, director & release_date."
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
        "Please fill all fields: title, director & release_date."
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
        "Please fill all fields: title, director & release_date."
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
