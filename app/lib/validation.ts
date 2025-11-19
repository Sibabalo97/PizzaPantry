import { z } from "zod";

export const ItemSchema = z.object({
  name: z.string().min(2, "Name too short"),
  category: z.enum(['ingredient','packaging','beverage','other']),
  quantity: z.number().min(0),
  unit: z.string().min(1),
  reorderPoint: z.number().min(0),
  supplier: z.string().optional()
});

export const AdjustSchema = z.object({
  type: z.enum(['add','remove']),
  amount: z.number().min(0.0001, "Must be > 0"),
  reason: z.string().min(5, "Reason too short")
});
