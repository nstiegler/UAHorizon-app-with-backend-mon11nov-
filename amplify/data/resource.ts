// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    // Jobs Table
    Job: a
      .model({
        jobId: a.string().required(), // Primary Key
        jobStatus: a.string().required(),
        scheduledDate: a.string().required(),
        technicianId: a.string(),
        // Define relationship to Technician
        technician: a.belongsTo("Technician", "technicianId"),
        serviceType: a.string().required(),
        priority: a.string().required(),
        createdAt: a.string().required(),
        // Define relationship to JobAssignment
        assignment: a.hasOne("JobAssignment", "jobId"),
      })
      .identifier(["jobId"])
      .secondaryIndexes((index) => [
        index("technicianId")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByTechnician"),
        index("jobStatus")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByStatus"),
      ]),

    // Technicians Table
    Technician: a
      .model({
        technicianId: a.string().required(),
        name: a.string().required(),
        skills: a.string().array(),
        status: a.string().required(),
        rating: a.float(),
        // Relationships
        jobs: a.hasMany("Job", "technicianId"),
        assignments: a.hasMany("JobAssignment", "technicianId"),
      })
      .identifier(["technicianId"])
      .secondaryIndexes((index) => [
        index("status")
          .sortKeys(["rating"])
          .queryField("listTechniciansByStatus"),
        index("rating").queryField("listTechniciansByRating"),
      ]),

    // JobAssignments Table
    JobAssignment: a
      .model({
        assignmentId: a.string().required(),
        jobId: a.string().required(),
        technicianId: a.string().required(),
        assignedDate: a.string().required(),
        completionStatus: a.string().required(),
        completionDate: a.string(),
        // Relationships
        job: a.belongsTo("Job", "jobId"),
        technician: a.belongsTo("Technician", "technicianId"),
      })
      .identifier(["assignmentId", "jobId"])
      .secondaryIndexes((index) => [
        index("technicianId")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByTechnician"),
        index("completionStatus")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByStatus"),
      ]),
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
