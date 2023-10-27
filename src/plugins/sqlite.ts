/**
 * This file is running in main process with node.js env
 */

import Database from "better-sqlite3";
import { SQLITE_CONSTANTS } from "../const/sqlite";

const sqlite = new Database(SQLITE_CONSTANTS.dbName, {
  verbose: console.log,
});

function getCurrentDatabaseVersion(): number {
  const isCreated = sqlite.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get("version");
  if (!isCreated) return 0;
  const version: any = sqlite.prepare("SELECT data FROM version").get();
  console.log("APP VERSION:", version.data);
  return version.data;
}

function createVersionTable() {
  sqlite.exec("CREATE TABLE version (data INTEGER)");
  sqlite.exec("INSERT INTO version (data) VALUES (1)");
}

function updateVersionTableData() {
  sqlite.prepare("UPDATE version SET data = ?").run(SQLITE_CONSTANTS.version);
}

export { sqlite, getCurrentDatabaseVersion, createVersionTable, updateVersionTableData };
