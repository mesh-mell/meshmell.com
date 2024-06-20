export type ShareModelType = {
  model_id: string;
  model_name: string;
};

export type UserType = {
  user_id: string;
  name: string;
  models: ShareModelType[];
};
