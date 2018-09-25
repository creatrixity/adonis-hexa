"use strict";

const { test, trait } = use("Test/Suite")("User");

const TEST_EMAIL = "john.doe@example.com";
const TEST_USERNAME = "kay.mathew";
const TEST_PASSWORD = "secretdecrypt";

trait("Test/ApiClient");

test("Should register a user through the HTTP client", async ({
  client,
  assert
}) => {
  let data = {
    username: TEST_USERNAME,
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  };

  let { username, email } = data;

  const response = await client
    .post(`/api/v1/users`)
    .send(data)
    .end();

  response.assertStatus(200);

  response.assertJSONSubset({
    user: {
      username,
      email
    }
  });
}).timeout(0);
