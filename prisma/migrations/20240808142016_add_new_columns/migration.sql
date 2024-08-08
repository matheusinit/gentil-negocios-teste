/*
  Warnings:

  - Added the required column `cpf` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeMae` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomePai` to the `Pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoas"
ADD COLUMN     "cpf" VARCHAR(11) NOT NULL,
ADD COLUMN     "nomeMae" VARCHAR(70) NOT NULL,
ADD COLUMN     "nomePai" VARCHAR(70) NOT NULL;
