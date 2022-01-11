import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//! Test DELETE /movies/:id
describe("DELETE /movies/:id", () => {
  describe("User send a valid ID", () => {
    it("Respond with a 201 status code and a confirmation message", (done) => {
      const validID = "9791295e-97c4-49b9-ageb-dbb8aa2gd8so";
      request
        .delete(`/movies/${validID}`)
        .expect(201)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg === `The movie "The Irishman" has been removed.`;
        })
        .end(done);
    });
  });
  describe("User send invalid ID", () => {
    it("Respond with a 404 status code and an error message", (done) => {
      const invalidID = "376502";
      request
        .delete(`/movies/${invalidID}`)
        .expect(404)
        .expect(res => {
          typeof res.body === 'object';
          res.body.msg === `There is no movie with id ${invalidID}`
        })
        .end(done);
    });
  });
});
