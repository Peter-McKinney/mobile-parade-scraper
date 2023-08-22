export interface FileWriter {
  writeFile(schedule: Record<string, string>): void;
  writeAllFiles(schedule: Record<string, string>): void;
}
