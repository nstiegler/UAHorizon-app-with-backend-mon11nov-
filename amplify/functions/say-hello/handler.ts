// amplify/functions/say-hello/handler.ts

import type { Schema } from "../../data/resource";

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments;
  // return typed from `.returns()`
  return `Hello, ${name}!`;
};
