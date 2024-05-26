import { z } from "zod";

const taskStatusEnum = ["pending", "in-progress", "completed"] as const;

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(taskStatusEnum).default("pending"),
  dueDate: z.string().transform((val) => new Date(val)), // transform to Date object
  user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"), // Validate as ObjectId
});

export { taskSchema, taskStatusEnum };
