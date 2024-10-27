import { PrismaClient } from "@prisma/client";

import seedData from "./seedData";

const prisma = new PrismaClient();

async function main() {
  const actionMap = new Map<string, any>();
  const categoryMap = new Map<string, any>();
  const userMap = new Map<string, any>();
  const formatMap = new Map<string, any>();
  const resolutionMap = new Map<string, any>();

  // Insert Actions
  for (const actionData of seedData.actions) {
    const action = await prisma.action.create({
      data: {
        name: actionData.name.en,
        icon: actionData.icon,
      },
    });
    actionMap.set(actionData.slug, action);
  }

  // Insert Users (Creators)
  for (const creatorData of seedData.creators) {
    const user = await prisma.user.create({
      data: {
        slug: creatorData.slug,
        name: creatorData.name.en,
        description: creatorData.description.en,
        roles: creatorData.roles,
      },
    });
    userMap.set(creatorData.slug, user);
  }

  // Insert Categories
  for (const categoryData of seedData.categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name, // JSON field
        icon: categoryData.icon,
        color: categoryData.color,
      },
    });
    categoryMap.set(categoryData.slug, category);
  }

  // Collect Formats and Resolutions
  const formatSet = new Set<string>();
  const resolutionSet = new Set<string>();

  for (const modelData of seedData.models) {
    if (modelData.formats) {
      for (const format of modelData.formats) {
        formatSet.add(format);
      }
    }

    if (modelData.resolutions) {
      for (const resolution of modelData.resolutions) {
        resolutionSet.add(resolution);
      }
    }
  }

  // Insert Formats
  for (const formatName of formatSet) {
    const format = await prisma.format.create({
      data: {
        name: formatName,
        isUsed: true,
      },
    });
    formatMap.set(formatName, format);
  }

  // Insert Resolutions
  for (const resolutionName of resolutionSet) {
    const resolution = await prisma.resolution.create({
      data: {
        name: resolutionName,
      },
    });
    resolutionMap.set(resolutionName, resolution);
  }

  // Insert ThreeDModels
  for (const modelData of seedData.models) {
    const user = userMap.get(modelData.creator);

    if (!user) {
      console.error(`User ${modelData.creator} not found`);
      continue;
    }

    const categories = modelData.categoryTags
      .map((slug: string) => categoryMap.get(slug))
      .filter(Boolean);

    const actions = modelData.actions
      .map((slug: string) => actionMap.get(slug))
      .filter(Boolean);

    const formats = (modelData.formats || [])
      .map((name: string) => formatMap.get(name))
      .filter(Boolean);

    const resolutions = (modelData.resolutions || [])
      .map((name: string) => resolutionMap.get(name))
      .filter(Boolean);

    await prisma.threeDModel.create({
      data: {
        name: modelData.name.en,
        description: modelData.description.en,
        scale: modelData.scale,
        rotationDegreesX: modelData.rotationDegrees.x,
        rotationDegreesY: modelData.rotationDegrees.y,
        rotationDegreesZ: modelData.rotationDegrees.z,
        price: modelData.price,
        license: modelData.license,
        credit: modelData.credit,
        isDownloadable: modelData.isDownloadable,
        publishedAt: new Date(modelData.published),
        user: { connect: { id: user.id } },
        categories: {
          connect: categories.map((category: any) => ({ id: category.id })),
        },
        actions: {
          connect: actions.map((action: any) => ({ id: action.id })),
        },
        formats: {
          connect: formats.map((format: any) => ({ id: format.id })),
        },
        resolutions: {
          connect: resolutions.map((resolution: any) => ({
            id: resolution.id,
          })),
        },
      },
    });
  }

  console.log("Database has been seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
