import { useQuery } from "@tanstack/react-query";

import { getAllModels, getModelById } from "@/src/utils/api";

export const useModel = (id: number, authStatus: string) => {
  return useQuery({
    queryKey: ["model", id],
    queryFn: () => getModelById(id, authStatus),
  });
};

export const useModels = ({ pageNum, lang }: any) => {
  return useQuery({
    queryKey: ["models"],
    queryFn: () => getAllModels({ pageNum, lang }),
  });
};
