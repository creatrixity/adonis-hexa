"use strict";

const { test, trait } = use("Test/Suite")("User");

const RANDOM_INT = Math.random() * 100;

const TEST_EMAIL = `john.doe${RANDOM_INT}@example.com`;
const TEST_USERNAME = `john.doe${RANDOM_INT}`;
const TEST_PASSWORD = "secretdecrypt";

const data = {
  username: TEST_USERNAME,
  email: TEST_EMAIL,
  password: TEST_PASSWORD
};

var uid = 1;

trait("Test/ApiClient");

test("Should register a user through the HTTP client", async ({
  client,
  assert
}) => {
  let { username, email } = data;

  const response = await client
    .post(`/api/v1/users`)
    .send(data)
    .end();

  uid = response.body.user.id;
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
  let { username, email } = data;

  const response = await client.get(`/api/v1/users/${uid}`).end();

  response.assertStatus(200);

  response.assertJSONSubset({
    username,
    email
  });
}).timeout(0);
