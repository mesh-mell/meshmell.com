-- CreateTable
CREATE TABLE "threed_models" (
    "id" SERIAL NOT NULL,
    "scale" DOUBLE PRECISION NOT NULL,
    "rotation_degrees_x" INTEGER NOT NULL,
    "rotation_degrees_y" INTEGER NOT NULL,
    "rotation_degrees_z" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "license" TEXT NOT NULL,
    "credit" TEXT,
    "is_downloadable" BOOLEAN NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "threed_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resolutions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "resolutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL,

    CONSTRAINT "formats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" JSONB NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "downloads" (
    "id" SERIAL NOT NULL,
    "threed_model_id" INTEGER NOT NULL,
    "download_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "downloads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "twitter_url" TEXT,
    "website_url" TEXT,
    "youtube_url" TEXT,
    "roles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expired_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModelResolution" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelFormat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelAction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ModelCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelResolution_AB_unique" ON "_ModelResolution"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelResolution_B_index" ON "_ModelResolution"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelFormat_AB_unique" ON "_ModelFormat"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelFormat_B_index" ON "_ModelFormat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelAction_AB_unique" ON "_ModelAction"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelAction_B_index" ON "_ModelAction"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ModelCategory_AB_unique" ON "_ModelCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ModelCategory_B_index" ON "_ModelCategory"("B");

-- AddForeignKey
ALTER TABLE "threed_models" ADD CONSTRAINT "threed_models_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "downloads" ADD CONSTRAINT "downloads_threed_model_id_fkey" FOREIGN KEY ("threed_model_id") REFERENCES "threed_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelResolution" ADD CONSTRAINT "_ModelResolution_A_fkey" FOREIGN KEY ("A") REFERENCES "resolutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelResolution" ADD CONSTRAINT "_ModelResolution_B_fkey" FOREIGN KEY ("B") REFERENCES "threed_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelFormat" ADD CONSTRAINT "_ModelFormat_A_fkey" FOREIGN KEY ("A") REFERENCES "formats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelFormat" ADD CONSTRAINT "_ModelFormat_B_fkey" FOREIGN KEY ("B") REFERENCES "threed_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelAction" ADD CONSTRAINT "_ModelAction_A_fkey" FOREIGN KEY ("A") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelAction" ADD CONSTRAINT "_ModelAction_B_fkey" FOREIGN KEY ("B") REFERENCES "threed_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelCategory" ADD CONSTRAINT "_ModelCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModelCategory" ADD CONSTRAINT "_ModelCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "threed_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;
