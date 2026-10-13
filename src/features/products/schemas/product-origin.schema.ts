import { z } from "zod";

export const publicProductOriginsSchema = z.array(z.string().min(1));
