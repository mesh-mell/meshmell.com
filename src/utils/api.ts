import axios from "axios";

import { LanguageType } from "@/src/types/language";

import {
  ModelCreateAndUpdateFormType,
  ModelDetailsType,
} from "../types/threeDModel";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getModelById = async (id: number, authStatus: string) => {
  return (
    await axiosInstance.get<ModelDetailsType>(`api/models${authStatus}/${id}/`)
  ).data;
};

export const getAllModels = async ({
  pageNum,
  lang,
}: {
  pageNum: number;
  lang: LanguageType;
}) => {
  return (await axiosInstance.get(`api/models?page=${pageNum}&lang=${lang}`))
    .data;
};

export const createModel = async (data: ModelCreateAndUpdateFormType) => {
  await axiosInstance.post("api/models/", data);
};

export const deleteModel = async (id: number) => {
  await axiosInstance.delete(`api/models/${id}/`);
};

export const updateModel = async (data: ModelCreateAndUpdateFormType) => {
  await axiosInstance.put(`api/models/${data.id}/`, data);
};
