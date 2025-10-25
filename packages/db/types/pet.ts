import { pets } from "@/schemas/index.ts";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Pet = InferSelectModel<typeof pets>;
export type NewPet = InferInsertModel<typeof pets>;
