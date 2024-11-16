import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { GetThreeDModelsQuery } from "@/src/services/IThreeDModelService";
import { ThreeDModelService } from "@/src/services/ThreeDModelService";
ThreeDModelBasic, 
import { checkAuthorization } from "../utils/checkAuthorization";

import {
  ThreeDModelOrderKeyType,
  VisibilityKeyType,
} from "@/src/literals/threeDModel";
import { ThreeDModelBasic } from "@/src/types/threeDModel";

const threeDModelService = new ThreeDModelService();

/**
 * @route   GET /api/threeDModels
 * @desc    Get threeDModels posts
 * @access  Public / Private
 */
export const GET = auth(async function GET(req) {
  const inSession =
    !req.auth || req.auth.user?.email !== process.env.ADMIN_EMAIL
      ? false
      : true;

  const page: string = req.nextUrl.searchParams.get("page") || "";
  const searchWord: string | undefined =
    req.nextUrl.searchParams.get("searchWord") || undefined;
  const order = req.nextUrl.searchParams.get("order") as
    | ThreeDModelOrderKeyType
    | undefined;
  const visibilities: VisibilityKeyType[] =
    (req.nextUrl.searchParams.getAll(
      "visibilities[]",
    ) as VisibilityKeyType[]) || [];
  const isPinned: boolean =
    req.nextUrl.searchParams.get("isPinned") === "true" || false;

  const query: GetThreeDModelsQuery = {
    page,
    searchWord,
    order,
    visibilities,
    isPinned,
    tagIds,
    inSession,
  };

  try {
    const { threeDModels, count } =
      await threeDModelService.getThreeDModels(query);

    return NextResponse.json(
      { message: "Success", threeDModels, count },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
});

/**
 * @route   POST /api/threeDModels
 * @desc    Create threeDModels post
 * @access  Private
 */
export const POST = auth(async function POST(req) {
  const { user: userGotFromHere, errorMessage } = await checkAuthorization(req);

  if (errorMessage) {
    return NextResponse.json({ error: errorMessage }, { status: 403 });
  }

  const {
    name,
    description,
    creator,
    categoryTags,
    price,
    resolutions,
    credit,
    license,
    scale,
    rotationDegree,
    formats,
    usedFormat,
    actions,
    isDownloadable,
    source,
  }: ThreeDModelBasic = await req.json();

  try {
    const newThreeDModel = await threeDModelService.createThreeDModel(
      {
        name,
        description,
        creator,
        categoryTags,
        price,
        resolutions,
        credit,
        license,
      },
      userGotFromHere.id,
    );

    return NextResponse.json(
      { message: "Success", newThreeDModel },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
