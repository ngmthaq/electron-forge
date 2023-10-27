import { createVersionTable, getCurrentDatabaseVersion, updateVersionTableData } from "../plugins/sqlite";

const currentVersion = getCurrentDatabaseVersion();

if (currentVersion === 0) {
  createVersionTable();
} else {
  // Migrate
}

updateVersionTableData();
