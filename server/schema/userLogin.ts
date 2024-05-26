import { z } from "zod";

const userLoginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export { userLoginSchema };