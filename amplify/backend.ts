import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource"; // Cognito
import { data } from "./data/resource"; // DynamoDB
import { sayHello } from "./functions/say-hello/resource"; // Lambda function
import { storage, firstBucket, secondBucket } from "./storage/resource"; // S3

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  sayHello,
  storage,
  firstBucket,
  secondBucket,
});
