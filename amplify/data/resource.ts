// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Jobs: a
      .model({
        JobID: a.id().required(),
        CustomerID: a.string(),
        JobStatus: a.string(),
        ScheduledDate: a.string(),
        TechnicianID: a.string(),
        ServiceType: a.string(),
        Priority: a.string(),
        CreatedAt: a.string(),
      })
      .identifier(["JobID"]),

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
        AssignedJobID: a.string(),
        Rating: a.float(),
      })
      .identifier(["TechnicianID"]),

    JobAssignments: a
      .model({
        AssignmentID: a.id(),
        JobID: a.string(),
        TechnicianID: a.string(),
        AssignedDate: a.string(),
        CompletionStatus: a.string(),
        CompletionDate: a.string(),
      })
      .identifier(["AssignmentID"]),
  })
  .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
