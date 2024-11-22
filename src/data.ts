import Gun from "gun";
import { Answer, Round } from "./types";

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });

export function addAnswer(
  roundId: string,
  playerName: string,
  category: string,
  answer: string,
): void {
  const timestamp = Date.now();
  const eg = gun.get("example");

  // Create the answer object
  const newAnswer: Answer = {
    player_name: playerName,
    category,
    answer,
  };

  // Create or update the round entry
  eg.get("rounds").get(roundId).get("answers").put({
    playerName: playerName,
    answer: newAnswer,
  });

  // Ensure the round entry has a timestamp
  eg.get("rounds").get(roundId).put({
    round_id: roundId,
    timestamp: timestamp,
    answers: [],
  });

  console.log(
    `Answer added: Round (${roundId}), Player (${playerName}), Category (${category})`,
  );
}

export function fetchLastFiveRounds(): Promise<Round[]> {
  return new Promise((resolve) => {
    const rounds: Round[] = [];

    gun
      .get("rounds")
      .map()
      .once((data: Round, roundId: string) => {
        if (data && data.timestamp) {
          rounds.push({ ...data, round_id: roundId });
        }
      });

    // Wait to ensure all data is loaded, then process
    setTimeout(() => {
      const sortedRounds = rounds.sort((a, b) => b.timestamp - a.timestamp);
      const lastFiveRounds = sortedRounds.slice(0, 5);
      resolve(lastFiveRounds);
    }, 1000);
  });
}

export function getRoundId(dateTime: Date | string): string {
  // Ensure the input is a Date object
  const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Extract hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}${minutes}`;
}
