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

test("Should return a list of users through the HTTP client", async ({
  client,
  assert
}) => {
  const response = await client.get(`/api/v1/users`).end();

  response.assertStatus(200);

  assert.isAtLeast(response.body.length, 1);
}).timeout(0);

test("Should return details about user #1 through the HTTP client", async ({
  client,
  assert
}) => {
  let data = {
    username: TEST_USERNAME,
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  };

  let { username, email } = data;

  const response = await client.get(`/api/v1/users/1`).end();

  response.assertStatus(200);

  response.assertJSONSubset({
    username,
    email
  });
}).timeout(0);
