import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(1, 'Username is required').trim(),
  email: z.string().email('Invalid email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export { userSchema };
