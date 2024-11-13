// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    // Jobs Table with temporary unique name
    JobTemp: a
      .model({
        jobId: a.string().required(),
        jobStatus: a.string().required(),
        scheduledDate: a.string().required(),
        technicianId: a.string(),
        technician: a.belongsTo("TechnicianTemp", "technicianId"),
        serviceType: a.string().required(),
        priority: a.string().required(),
        createdAt: a.string().required(),
        assignment: a.hasOne("JobAssignmentTemp", "jobId"),
      })
      .identifier(["jobId"])
      .secondaryIndexes((index) => [
        index("technicianId")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByTechnicianTemp"),
        index("jobStatus")
          .sortKeys(["scheduledDate"])
          .queryField("listJobsByStatusTemp"),
      ]),

    // Technicians Table with temporary unique name
    TechnicianTemp: a
      .model({
        technicianId: a.string().required(),
        name: a.string().required(),
        skills: a.string().array(),
        status: a.string().required(),
        rating: a.float(),
        jobs: a.hasMany("JobTemp", "technicianId"),
        assignments: a.hasMany("JobAssignmentTemp", "technicianId"),
      })
      .identifier(["technicianId"])
      .secondaryIndexes((index) => [
        index("status")
          .sortKeys(["rating"])
          .queryField("listTechniciansByStatusTemp"),
        index("rating").queryField("listTechniciansByRatingTemp"),
      ]),

    // JobAssignments Table with temporary unique name
    JobAssignmentTemp: a
      .model({
        assignmentId: a.string().required(),
        jobId: a.string().required(),
        technicianId: a.string().required(),
        assignedDate: a.string().required(),
        completionStatus: a.string().required(),
        completionDate: a.string(),
        job: a.belongsTo("JobTemp", "jobId"),
        technician: a.belongsTo("TechnicianTemp", "technicianId"),
      })
      .identifier(["assignmentId", "jobId"])
      .secondaryIndexes((index) => [
        index("technicianId")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByTechnicianTemp"),
        index("completionStatus")
          .sortKeys(["assignedDate"])
          .queryField("listAssignmentsByStatusTemp"),
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
