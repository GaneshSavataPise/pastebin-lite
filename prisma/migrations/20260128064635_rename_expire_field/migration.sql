/*
  Warnings:

  - You are about to drop the column `expireAt` on the `Paste` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    "remainingViews" INTEGER
);
INSERT INTO "new_Paste" ("content", "createdAt", "id", "remainingViews") SELECT "content", "createdAt", "id", "remainingViews" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
