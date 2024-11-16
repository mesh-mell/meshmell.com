export type ThreeDModelDetailsType = {
  name: string;
  description: string;
  creator: string;
  published: string;
  updated: string;
  categoryTags: string[];
  slug: string;
  price: number;
  resolutions: string[] | null;
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  formats: string[];
  usedFormat: string;
  actions?: string[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  };
};

export type ThreeDModelCreateAndUpdateFormType = {
  id: number;
  name: string;
  description: string;
  creator: string;
  categoryTags: string[];
  price: number;
  resolutions: string[] | null;
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  formats: string[];
  usedFormat: string;
  actions?: string[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  };
};

export type ActionBasicForm = {
  id: number;
  name: string;
};

export type ThreeDModelFormatBasicForm = {
  id: number;
  name: string;
  isUsed: boolean;
};

export type ThreeDModelBasicForm = {
  name: string;
  slug: string;
  publishedAt: Date;
  userId: number;
  description: string;
  creator: string;
  categoryIds: number[];
  price: number;
  resolutionIds: number[];
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  formats: ThreeDModelFormatBasicForm[];
  actions?: ActionBasicForm[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  };
};

export type ThreeDModelBasic = {
  name: string;
  description: string;
  creator: string;
  categoryTags: string[];
  price: number;
  resolutions: string[] | null;
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  formats: string[];
  usedFormat: string;
  actions?: string[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  };
};

export type ThreeDModelBasicFormWithID = {
  id: number;
  name: string;
  description: string;
  creator: string;
  categoryTags: string[];
  price: number;
  resolutions: string[] | null;
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  };
  formats: string[];
  usedFormat: string;
  actions?: string[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  };
};

export type ThreeDModelAll = ThreeDModelBasic & {
  id: number;
  updatedAt: Date;
  createdAt: Date;
};

type User = {
  id: number;
  email?: string | null;
  emailVerifiedAt?: Date | null;
  password?: string | null;
  slug: string;
  name: string;
  description?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
  youtubeUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type Action = {
  id: number;
  slug: string;
  name: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
};

type Download = {
  id: number;
  threeDModelId: number;
  downloadAt: Date;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

type Resolution = {
  id: number;
  name: string;
};

type Format = {
  id: number;
  name: string;
};

type ThreeDModelFormat = {
  threeDModelId: number;
  formatId: number;
  isUsed: boolean;
  format: Format;
};

export type ThreeDModelApiResponse = {
  id: number;
  scale: number;
  rotationDegreesX: number;
  rotationDegreesY: number;
  rotationDegreesZ: number;
  name: string;
  slug: string;
  description: string;
  userId: number;
  price: number;
  license: string;
  credit?: string | null;
  isDownloadable: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  actions: Action[];
  categories: Category[];
  resolutions: Resolution[];
  formats: ThreeDModelFormat[];
  downloads: Download[];
};
