// Make the AI Judge Laugh — entry program.
// Writes one single-line office joke to /output/entry.txt.
// Deterministic: no network, no randomness, no secrets, no env vars.
//
// The program scores three candidate lines against the judge's published
// criteria (office subject, true observation, surprising turn, tightness,
// originality — each 0-5) and writes the highest-scoring one.

import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  office: number;
  truth: number;
  surprise: number;
  tightness: number;
  originality: number;
};

const CANDIDATES: Candidate[] = [
  {
    text: "Our office printer only jams on urgent documents, which is how I know it reads the calendar better than my manager does.",
    office: 5,
    truth: 5,
    surprise: 4,
    tightness: 3,
    originality: 4,
  },
  {
    text: "The printer has one job, and it still scheduled a meeting to discuss it.",
    office: 5,
    truth: 5,
    surprise: 5,
    tightness: 5,
    originality: 4,
  },
  {
    text: "My boss scheduled a meeting about too many meetings, then a follow-up to discuss the first one.",
    office: 5,
    truth: 5,
    surprise: 2,
    tightness: 4,
    originality: 2,
  },
];

const OUTPUT_PATH = "/output/entry.txt";

function score(c: Candidate): number {
  return c.office + c.truth + c.surprise + c.tightness + c.originality;
}

function pickWinner(): string {
  let best = CANDIDATES[0];
  for (const c of CANDIDATES.slice(1)) {
    if (score(c) > score(best)) best = c;
  }
  return best.text;
}

function main(): void {
  const line = pickWinner().trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
}

main();
