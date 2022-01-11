import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//! Test Get
describe("GET /", () => {
  it("Respond with html", (done) => {
    request
      .get("/")
      .expect(200)
      .expect((res) => {
        res.header["content-type"] === "text/html; charset=utf-8";
        res.text.includes("Welcome to movies library server");
      })
      .end(done);
  });
});

//! Test GET /movies
describe("GET /movies", () => {
  describe("User send a get request", () => {
    it("Respond with a 200 status code, json in header content type, and return an object of 2 items", (done) => {
      request
        .get("/movies")
        .expect(200)
        .expect((res) => {
          res.headers["content-type"] === "json";
          typeof res.body === "object";
          res.body.length === 2;
        })
        .end(done);
    });
  });
});

//! Test GET /movies/:id
describe("Get /movies/:id", () => {
  describe("User send a valid ID", () => {
    it("Respond with a 200 status code and send back the movie object", (done) => {
      const validID = "9791295e-97c4-49b9-ageb-dbb8aa2gd8so";
      request
        .get(`/movies/${validID}`)
        .expect(200)
        .expect((res) => {
          typeof res.body === "object";
          res.body ===
            {
              id: "9791295e-97c4-49b9-ageb-dbb8aa2gd8so",
              title: "The Irishman",
              director: "Martin Scorsese",
              release_date: "2019-09-27",
            };
        })
        .end(done);
    });
  });
  describe("User send invalid ID", () => {
    it("Respond with a 404 status code and with error message", (done) => {
      const invalidID = "76679071";
      request
        .get(`/movies/${invalidID}`)
        .expect(404)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg === `There is no movie with id ${invalidID}`;
        })
        .end(done);
    });
  });
});
