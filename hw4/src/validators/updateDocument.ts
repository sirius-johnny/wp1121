// 此檔需修改
import { z } from "zod";

export const updateDocSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});
