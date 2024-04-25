-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modificado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartaos" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "nomeProprietario" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "digitoSeguranca" INTEGER NOT NULL,
    "usuarioId" TEXT,

    CONSTRAINT "cartaos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartaos" ADD CONSTRAINT "cartaos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
