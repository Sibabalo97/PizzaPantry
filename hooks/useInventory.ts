import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./../app/lib/api";
import { Item } from "./../app/types/Item";

export function useInventory() {
  const qc = useQueryClient();


  const query = useQuery({
    queryKey: ["items"],
    queryFn: api.getItems,
    staleTime: 1000 * 30,
  });

  // CREATE
  const create = useMutation({
    mutationFn: (payload: Omit<Item, "id" | "lastUpdated">) =>
      api.createItem(payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // UPDATE
  const update = useMutation({
    mutationFn: (input: { id: string; payload: Partial<Item> }) =>
      api.updateItem(input.id, input.payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // DELETE
  const remove = useMutation({
    mutationFn: (id: string) => api.deleteItem(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // ADJUST QUANTITY
  const adjust = useMutation({
    mutationFn: (input: {
      id: string;
      type: "add" | "remove";
      amount: number;
      reason: string;
      user: string;
    }) =>
      api.adjustItem(input.id, input.type, input.amount, input.reason, input.user),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });

  // LOGS — by item
  const getLogs = (itemId: string) =>
    useQuery({
      queryKey: ["logs", itemId],
      queryFn: () => api.getLogsForItem(itemId),
      enabled: !!itemId,
    });

  return {
    query,
    create,
    update,
    remove,
    adjust,
    getLogs,
  };
}
