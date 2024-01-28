/*
  Warnings:

  - The values [ORDER_FILE,SUBMISSION_FILE] on the enum `FileType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FileType_new" AS ENUM ('INSTRUCTIONS', 'RUBRIC', 'ORDER_DOCUMENT', 'REVISION_DOCUMENT', 'GRAMMARLY_REPORT', 'TURNITIN_REPORT', 'OTHER');
ALTER TABLE "File" ALTER COLUMN "type" TYPE "FileType_new" USING ("type"::text::"FileType_new");
ALTER TYPE "FileType" RENAME TO "FileType_old";
ALTER TYPE "FileType_new" RENAME TO "FileType";
DROP TYPE "FileType_old";
COMMIT;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "submissionId" TEXT;

-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
