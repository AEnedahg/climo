import { z } from "zod";

const search = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  url: z.string(),
})

export const searchSchema = z.array(
  search
)

