/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_cpf_key" ON "Pessoas"("cpf");
