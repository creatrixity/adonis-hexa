"use strict";

const { test } = use("Test/Suite")("Fetch User Feature");
const CreateUserFeature = use("Src/Services/Api/Features/CreateUserFeature");
const FetchUserFeature = use("Src/Services/Api/Features/FetchUserFeature");

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

  const createdUser = await new CreateUserFeature({ data }).handle();

  const user = await new FetchUserFeature({ id: createdUser.user.id }).handle();

  assert.containsAllKeys(user, ["username", "email"]);
});
