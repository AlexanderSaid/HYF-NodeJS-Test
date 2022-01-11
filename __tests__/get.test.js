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




