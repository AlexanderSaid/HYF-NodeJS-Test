import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

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
