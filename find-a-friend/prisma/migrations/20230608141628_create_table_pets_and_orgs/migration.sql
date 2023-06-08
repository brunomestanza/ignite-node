-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Jovem', 'Adulto');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Pequenino', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta');

-- CreateEnum
CREATE TYPE "Space" AS ENUM ('Amplo', 'Médio', 'Pequeno');

-- CreateEnum
CREATE TYPE "IdependencyLevel" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio (precisa de companhia moderada)', 'Alto (precisa de companhia constante)');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Cachorro', 'Gato', 'Peixe');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "space" "Space" NOT NULL,
    "idependencyLevel" "IdependencyLevel" NOT NULL,
    "type" "Type" NOT NULL,
    "org" TEXT NOT NULL,
    "adoptionRequirements" TEXT[],

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
