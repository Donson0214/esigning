-- CreateEnum
CREATE TYPE "FieldStatus" AS ENUM ('EMPTY', 'FILLED', 'SIGNED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FieldType" ADD VALUE 'INITIAL';
ALTER TYPE "FieldType" ADD VALUE 'FULL_NAME';
ALTER TYPE "FieldType" ADD VALUE 'EMAIL';
ALTER TYPE "FieldType" ADD VALUE 'TEXT';
ALTER TYPE "FieldType" ADD VALUE 'CHECKBOX';
ALTER TYPE "FieldType" ADD VALUE 'DROPDOWN';
ALTER TYPE "FieldType" ADD VALUE 'RADIO';
ALTER TYPE "FieldType" ADD VALUE 'COMPANY';
ALTER TYPE "FieldType" ADD VALUE 'JOB_TITLE';
ALTER TYPE "FieldType" ADD VALUE 'IMAGE';
ALTER TYPE "FieldType" ADD VALUE 'ATTACHMENT';

-- DropForeignKey
ALTER TABLE "SignatureField" DROP CONSTRAINT "SignatureField_signerId_fkey";

-- AlterTable
ALTER TABLE "SignatureField" ADD COLUMN     "label" TEXT,
ADD COLUMN     "options" JSONB,
ADD COLUMN     "placeholder" TEXT,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "signerEmail" TEXT,
ADD COLUMN     "status" "FieldStatus" NOT NULL DEFAULT 'EMPTY',
ADD COLUMN     "value" TEXT,
ALTER COLUMN "signerId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "SignatureField_signerEmail_idx" ON "SignatureField"("signerEmail");

-- AddForeignKey
ALTER TABLE "SignatureField" ADD CONSTRAINT "SignatureField_signerId_fkey" FOREIGN KEY ("signerId") REFERENCES "Signer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
