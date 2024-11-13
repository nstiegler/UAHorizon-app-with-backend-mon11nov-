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
        // Define relationship to Technician
        technicianId: a.string(),
        technician: a.belongsTo("Technician", "technicianId"),
        serviceType: a.string().required(),
        priority: a.string().required(),
        createdAt: a.string().required(),
        // Define relationship to JobAssignment
        assignment: a.hasOne("JobAssignment", "jobId"),
      })
      .identifier(["jobId"]) // Simplified to single primary key
      .secondaryIndexes((index) => [
        // Index for querying by technician
        index("technicianId")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByTechnician"),

        // Index for querying by status
        index("jobStatus")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByStatus"),
      ]),

    // Technicians Table
    Technician: a
      .model({
        technicianId: a.string().required(), // Partition Key
        name: a.string().required(),
        skills: a.string().array(),
        status: a.string().required(), // Changed from 'availability' to 'status'
        rating: a.float(),
        // Relationships
        currentAssignment: a.hasOne("JobAssignment", "technicianId"),
        assignments: a.hasMany("JobAssignment", "technicianId"),
      })
      .identifier(["technicianId"])
      .secondaryIndexes((index) => [
        // Index for finding technicians by status
        index("status")
          .sortKeys(["rating"])
          .queryField("listTechniciansByStatus"),

        // Index for technicians by rating
        index("rating").queryField("listTechniciansByRating"),
      ]),

    // JobAssignments Table
    JobAssignment: a
      .model({
        assignmentId: a.string().required(), // Partition Key
        jobId: a.string().required(), // Sort Key
        technicianId: a.string().required(),
        assignedDate: a.string().required(), // ISO date
        completionStatus: a.string().required(), // e.g., Pending, Completed
        completionDate: a.string(), // Nullable ISO date
        // Relationships
        job: a.belongsTo("Job", "jobId"),
        technician: a.belongsTo("Technician", "technicianId"),
      })
      .identifier(["assignmentId", "jobId"])
      .secondaryIndexes((index) => [
        // Index for finding assignments by technician
        index("technicianId")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByTechnician"),

        // Index for finding assignments by status
        index("completionStatus")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByStatus"),
      ]),
  })
  .authorization((allow) => [
    allow.publicApiKey(), // Simplified authorization as requested
  ]);

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
