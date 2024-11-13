import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

// Function to perform CRUD operations
export async function runSchemaTest() {
  try {
    // **Create an Item**
    const { data: newJob, errors: createErrors } =
      await client.models.Job.create({
        jobId: "job123",
        jobStatus: "PENDING",
        scheduledDate: new Date().toISOString(),
        serviceType: "Repair",
        priority: "High",
        technicianId: "tech123",
        createdAt: new Date().toISOString(),
      });
    if (createErrors) {
      console.error("Create Errors:", createErrors);
      alert("Create operation failed.");
    } else {
      console.log("Created Job:", newJob);
      alert("Create operation succeeded!");
    }

    // **Update an Item**
    const { data: updatedJob, errors: updateErrors } =
      await client.models.Job.update({
        jobId: "job123",
        jobStatus: "IN_PROGRESS",
      });
    if (updateErrors) {
      console.error("Update Errors:", updateErrors);
      alert("Update operation failed.");
    } else {
      console.log("Updated Job:", updatedJob);
      alert("Update operation succeeded!");
    }

    // **Query (Read) an Item**
    const { data: jobList, errors: queryErrors } =
      await client.models.Job.list();
    if (queryErrors) {
      console.error("Query Errors:", queryErrors);
      alert("Query operation failed.");
    } else {
      console.log("Job List:", jobList);
      alert("Query operation succeeded!");
    }

    // **Delete an Item**
    const { data: deletedJob, errors: deleteErrors } =
      await client.models.Job.delete({
        jobId: "job123",
      });
    if (deleteErrors) {
      console.error("Delete Errors:", deleteErrors);
      alert("Delete operation failed.");
    } else {
      console.log("Deleted Job:", deletedJob);
      alert("Delete operation succeeded!");
    }
  } catch (error) {
    console.error("Error during CRUD operations:", error);
    alert("An error occurred during the CRUD operations.");
  }
}
