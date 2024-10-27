import axios from "axios";

import { VisibilityKeyType } from "@/src/literals/threeDModel/threeDModels";
import { PostsSortProps } from "@/src/types/post";
import {
  ThreeDModelAll,
  ThreeDModelBasicForm,
  ThreeDModelBasicFormWithID,
} from "@/src/types/threeDModels/threeDModel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getThreeDModelById = async ({ id }: { id: number }) => {
  return (await axiosInstance.get<ThreeDModelAll>(`api/threeDModels/${id}/`))
    .data;
};

export const getThreeDModels = async ({
  pageNum,
  order,
  searchWord,
  visibilities,
  isPinned,
  tagIds,
}: {
  pageNum: number | null;
  order: PostsSortProps | null;
  searchWord: string | null;
  visibilities: VisibilityKeyType[];
  isPinned: boolean;
  tagIds: number[];
}) => {
  return (
    await axiosInstance.get<{
      threeDModels: ThreeDModelAll[];
      count: number;
    }>("api/threeDModels/", {
      params: {
        page: pageNum,
        order,
        searchWord,
        visibilities,
        isPinned,
        tagIds,
      },
    })
  ).data;
};

export const createThreeDModel = async (threeDModel: ThreeDModelBasicForm) => {
  await axiosInstance.post("api/threeDModels/", threeDModel);
};

export const updateThreeDModel = async (
  threeDModel: ThreeDModelBasicFormWithID,
) => {
  await axiosInstance.put(`api/threeDModels/${threeDModel.id}/`, threeDModel);
};

export const deleteThreeDModel = async (id: number) => {
  await axiosInstance.delete(`api/threeDModels/${id}/`);
};

export const getThreeDModelsCSV = async () => {
  return (
    await axiosInstance.get<{
      csv: string;
    }>("api/threeDModels/csv/")
  ).data;
};
