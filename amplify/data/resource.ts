// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Jobs: a
    .model({
      JobID: a.id(),
      CustomerID: a.string(),
      JobStatus: a.string(),
      ScheduledDate: a.string(),
      TechnicianID: a.string(),
      ServiceType: a.string(),
      Priority: a.string(),
      CreatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Technicians: a
    .model({
      TechnicianID: a.id(),
      Name: a.string(),
      Skills: a.enum([
        "GR1",
        "GR2",
        "GR4",
        "ESHS",
        "ICH",
        "PINT",
        "MAP",
        "NDT",
      ]),
      Availability: a.boolean(),
      AssignedJobID: a.string(), // Changed to nullable
      Rating: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  JobAssignments: a
    .model({
      AssignmentID: a.id(),
      JobID: a.string(),
      TechnicianID: a.string(),
      AssignedDate: a.string(),
      CompletionStatus: a.string(),
      CompletionDate: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
