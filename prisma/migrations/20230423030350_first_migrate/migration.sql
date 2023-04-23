-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "applicationProvider" TEXT NOT NULL,
    "yearEstablished" DATETIME NOT NULL,
    "profitOrLoss" INTEGER NOT NULL,
    "loanAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_company_applicationProvider_key" ON "Application"("company", "applicationProvider");
