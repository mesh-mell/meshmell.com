const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Actions
  const actions = [
    { slug: "action-1", nameEn: "Action One", icon: "icon-1" },
    { slug: "action-2", nameEn: "Action Two", icon: "icon-2" },
  ];

  for (const action of actions) {
    await prisma.action.create({
      data: action,
    });
  }

  // Create Creators
  const creators = [
    {
      slug: "creator-1",
      nameEn: "Creator One",
      descriptionEn: "Description One",
      twitter: "https://twitter.com/creator1",
      website: "https://creator1.com",
      youtube: "https://youtube.com/creator1",
      roles: ["role1", "role2"],
    },
    {
      slug: "creator-2",
      nameEn: "Creator Two",
      descriptionEn: "Description Two",
      twitter: "https://twitter.com/creator2",
      website: "https://creator2.com",
      youtube: "https://youtube.com/creator2",
      roles: ["role3", "role4"],
    },
  ];

  for (const creator of creators) {
    await prisma.creator.create({
      data: creator,
    });
  }

  // Create Categories
  const categories = [
    {
      slug: "category-1",
      nameEn: "Category One",
      icon: "icon-1",
      color: "red",
    },
    {
      slug: "category-2",
      nameEn: "Category Two",
      icon: "icon-2",
      color: "blue",
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  // Create Models
  const models = [
    {
      slug: "model-1",
      resolutions: ["res-1", "res-2"],
      formats: ["format-1", "format-2"],
      usedFormat: "format-1",
      scale: 1.0,
      rotationDegreesX: 0,
      rotationDegreesY: 0,
      rotationDegreesZ: 0,
      nameEn: "Model One",
      descriptionEn: "Description One",
      creatorId: 1,
      categoryId: 1,
      published: new Date(),
      updated: new Date(),
      categoryTags: ["tag1", "tag2"],
      price: 19.99,
      license: "license-1",
      credit: "credit-1",
      isDownloadable: true,
    },
    {
      slug: "model-2",
      resolutions: ["res-3", "res-4"],
      formats: ["format-3", "format-4"],
      usedFormat: "format-3",
      scale: 1.5,
      rotationDegreesX: 45,
      rotationDegreesY: 45,
      rotationDegreesZ: 45,
      nameEn: "Model Two",
      descriptionEn: "Description Two",
      creatorId: 2,
      categoryId: 2,
      published: new Date(),
      updated: new Date(),
      categoryTags: ["tag3", "tag4"],
      price: 29.99,
      license: "license-2",
      credit: "credit-2",
      isDownloadable: false,
    },
  ];

  for (const model of models) {
    await prisma.model.create({
      data: model,
    });
  }

  // Create ModelDownloads
  const modelDownloads = [
    {
      modelId: 1,
      downloadId: "download-1",
      timeStamp: new Date(),
    },
    {
      modelId: 2,
      downloadId: "download-2",
      timeStamp: new Date(),
    },
  ];

  for (const modelDownload of modelDownloads) {
    await prisma.modelDownload.create({
      data: modelDownload,
    });
  }

  // Create ModelActions
  const modelActions = [
    {
      modelId: 1,
      actionId: 1,
    },
    {
      modelId: 2,
      actionId: 2,
    },
  ];

  for (const modelAction of modelActions) {
    await prisma.modelAction.create({
      data: modelAction,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
