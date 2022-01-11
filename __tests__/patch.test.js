import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

//! Test PATCH /movies/:id
describe("PATCH /movies/:id", () => {
  describe("User send invalid data", () => {
    // Sending empty or wrong data
    it("Respond with a 400 status code and an error message", (done) => {
      const validID = "9791438e-97c4-49b9-aaab-dbb8aa2jg9bz";

      request
        .patch(`/movies/${validID}`)
        .send({})
        .expect(400)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg ===
            "Please fill a field to update: title, director or release_date.";
        })
        .end(done);
    });

    // Sending invalid id
    it("Respond with a 404 status code and an error message", (done) => {
      const invalidID = "376502";

      request
        .patch(`/movies/${invalidID}`)
        .send({
          title: "Before Sunset",
        })
        .expect(404)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg === `There is no movie with id ${invalidID}`;
        })
        .end(done);
    });
  });

  describe("User send a valid data", () => {
    it("Respond with 201 status code and confirm message", (done) => {
      const validID = "9791438e-97c4-49b9-aaab-dbb8aa2jg9bz";
      request
        .patch(`/movies/${validID}`)
        .send({
          director: "Christopher Nolan",
        })
        .expect(201)
        .expect((res) => {
          typeof res.body === "object";
          res.body.msg === `Movie with id ${validID} is updated`;
        })
        .end(done);
    });
  });
});
