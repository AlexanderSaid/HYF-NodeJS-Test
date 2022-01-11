import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//!Test POST /movies
describe("POST /movies", () => {
  describe("User send a valid request", () => {
    it("Respond with a 201 status code and confirmation message", (done) => {
      const movieTest = {
        title: "Before Sunset",
        director: "Richard Linklater",
        release_date: "2004-02-10",
      };
      request
        .post("/movies")
        .send(movieTest)
        .expect(201)
        .expect((res) => {
          typeof res.body === "object";
          Object.keys(res.body)[0] === "msg";
          typeof res.body.msg === "string";
        })
        .end(done);
    });
  });

  describe("User send an invalid request", () => {
    it("Request doesn't contain 'title' Respond with 400 status code and error message", (done) => {
      const movieTest = {
        director: "Richard Linklater",
        release_date: "2004-02-10",
      };
      request
        .post("/movies")
        .send(movieTest)
        .expect(400)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg ===
            "Please fill all fields: title, director & release_date.";
        })
        .end(done);
    });

    it("Request doesn't contain 'director' Respond with 400 status code and error message", (done) => {
      const movieTest = {
        title: "Before Sunset",
        release_date: "2004-02-10",
      };
      request
        .post("/movies")
        .send(movieTest)
        .expect(400)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg ===
            "Please fill all fields: title, director & release_date.";
        })
        .end(done);
    });

    it("Request doesn't contain 'release date' Respond with 400 status code and error message", (done) => {
      const movieTest = {
        title: "Before Sunset",
        director: "Richard Linklater",
      };
      request
        .post("/movies")
        .send(movieTest)
        .expect(400)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg ===
            "Please fill all fields: title, director & release_date.";
        })
        .end(done);
    });
  });
  describe("User try to add an already exist movie", () => {
    it("Respond with a 400 status code and error message", (done) => {
      const movieTest = {
        title: "Inception",
        director: "Christopher",
        release_date: "2010-07-16",
      };
      request
        .post("/movies")
        .send(movieTest)
        .expect(400)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg ===
            "This movie already exist in the database with id 9791438e-97c4-49b9-aaab-dbb8aa2jg9bz";
        })
        .end(done);
    });
  });
});
