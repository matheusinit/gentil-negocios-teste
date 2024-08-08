-- CreateTable
CREATE TABLE "Pessoas" (
    "idPessoa" TEXT NOT NULL,
    "nome" VARCHAR(70) NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "salario" INTEGER NOT NULL,
    "observacoes" TEXT NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("idPessoa")
);
