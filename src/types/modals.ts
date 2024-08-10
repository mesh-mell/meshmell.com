export type ModalOpenTypeForHome = {
  language: boolean;
  terms: boolean;
  privacy: boolean;
  contact: boolean;
  about: boolean;
  who: boolean;
  forDevelopers: boolean;
  forSponsors: boolean;
  lightAndDarkTheme: boolean;
  sponsors: boolean;
  footer: boolean;
  shareThisPage: boolean;
  copyRight: boolean;
};

export type ModalOpenTypeForShare = ModalOpenTypeForHome & {
  modelInfo: boolean;
  creatorInfo: boolean;
  actionsSwitch: boolean;
};

export type ModalOpenTypeForExhibition = ModalOpenTypeForShare & {
  search: boolean;
  categoryFilter: boolean;
  download: boolean;
  downloadCredit: boolean;
  creatorFilter: boolean;
  downloadError: boolean;
  viewsSwitch: boolean;
  creatorInfoInNotFocused: boolean;
  shareThisPageInList: boolean;
};

export type ModalName =
  | "footer"
  | "terms"
  | "privacy"
  | "contact"
  | "about"
  | "who"
  | "search"
  | "language"
  | "modelInfo"
  | "categoryFilter"
  | "download"
  | "creatorInfo"
  | "downloadCredit"
  | "creatorFilter"
  | "copyRight"
  | "actionsSwitch"
  | "downloadError"
  | "sponsors"
  | "viewsSwitch"
  | "creatorInfoInNotFocused"
  | "shareThisPage"
  | "shareThisPageInList"
  | "forDevelopers"
  | "forSponsors"
  | "lightAndDarkTheme";
