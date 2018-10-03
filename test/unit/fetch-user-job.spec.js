"use strict";

const { test } = use("Test/Suite")("Fetch User Feature");
const CreateUserJob = use("Src/Domains/User/Jobs/CreateUserJob");
const FetchUserJob = use("Src/Domains/User/Jobs/FetchUserJob");

const RANDOM_INT = Math.random() * 100;

const TEST_EMAIL = `john.doe${RANDOM_INT}@example.com`;
const TEST_USERNAME = `john.doe${RANDOM_INT}`;
const TEST_PASSWORD = "secretdecrypt";

const data = {
  username: TEST_USERNAME,
  email: TEST_EMAIL,
  password: TEST_PASSWORD
};

test("Should fetch a user when passed data", async ({ assert }) => {
  const { username, email } = data;

  const createdUser = await new CreateUserJob({ data }).handle();

  const user = await new FetchUserJob({ id: createdUser.id }).handle();

  assert.containsAllKeys(user, ["username", "email"]);
});
