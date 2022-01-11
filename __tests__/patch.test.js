import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

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
