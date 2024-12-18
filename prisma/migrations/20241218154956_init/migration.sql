-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date_start" DATETIME NOT NULL,
    "date_end" DATETIME,
    "done" BOOLEAN NOT NULL DEFAULT false
);
