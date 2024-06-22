import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ModelCreateAndUpdateFormType } from "@/src/types/models";
import { createModel, deleteModel, updateModel } from "@/src/utils/api";

export const useDeleteModel = () => {
  return useMutation({
    mutationFn: (id: number) => deleteModel(id),
  });
};

export const useUpdateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ModelCreateAndUpdateFormType) => updateModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};

export const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ModelCreateAndUpdateFormType) => createModel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
