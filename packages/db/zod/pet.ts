import { pets } from "@/schemas/index.ts";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const insertPetSchema = createInsertSchema(pets);
export const selectPetSchema = createSelectSchema(pets);
