import {
  ThreeDModelApiResponse,
  ThreeDModelBasicForm,
} from "@/src/types/threeDModel";

export type GetThreeDModelsQuery = {
  name: string | null;
  category: string | null;
  user: string | null;
};

export interface IThreeDModelService {
  getThreeDModels(
    query: GetThreeDModelsQuery,
  ): Promise<{ threeDModels: ThreeDModelApiResponse[]; count: number }>;
  getThreeDModel(threeDModelId: number): Promise<ThreeDModelApiResponse>;
  createThreeDModel(
    threeDModel: ThreeDModelBasicForm,
    thoughtId: number,
  ): Promise<ThreeDModelApiResponse>;
  updateThreeDModel(
    threeDModelId: number,
    threeDModel: ThreeDModelBasicForm,
  ): Promise<ThreeDModelApiResponse>;
  deleteThreeDModel(threeDModelId: number): Promise<void>;
}
