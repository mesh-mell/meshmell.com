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
  footer: false;
  shareThisPage: boolean;
  copyRight: boolean;
};

export type ModalOpenTypeForExhibition = ModalOpenTypeForHome & {
  search: boolean;
  modelInfo: boolean;
  categoryFilter: boolean;
  download: boolean;
  creatorInfo: boolean;
  downloadCredit: boolean;
  creatorFilter: boolean;
  actionsSwitch: boolean;
  downloadError: boolean;
  viewsSwitch: boolean;
  creatorInfoInNotFocused: boolean;
  shareThisPageInList: boolean;
};

export type ModalOpenTypeForShare = ModalOpenTypeForExhibition & {
  search: boolean;
  modelInfo: boolean;
  categoryFilter: boolean;
  download: boolean;
  creatorInfo: boolean;
  downloadCredit: boolean;
  creatorFilter: boolean;
  copyRight: boolean;
  actionsSwitch: boolean;
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
