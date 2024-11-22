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

  // Create the answer object
  const newAnswer: Answer = {
    player_name: playerName,
    category: category,
    answer: answer,
  };

  // Create or update the round entry
  gun
    .get("ecir")
    .get(roundId)
    .get("answers")
    .put(
      {
        playerName: newAnswer.player_name,
        category: newAnswer.category,
        answer: newAnswer.answer,
      },
      () => console.log("created answer"),
    );

  // Ensure the round entry has a timestamp
  gun
    .get("ecir")
    .get(roundId)
    .put(
      {
        round_id: roundId,
        timestamp: timestamp,
      },
      () => console.log("created round"),
    );

  console.log(
    `Answer added: Round (${roundId}), Player (${playerName}), Category (${category})`,
  );
}

export function fetchLastFiveRounds(): Promise<Round[]> {
  return new Promise((resolve) => {
    const rounds: Round[] = [];

    gun
      .get("ecir")
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

export function createBaseRounds() {
  console.log("hello");

  for (let i = 1; i <= 2; ++i) {
    gun
      .get("ecir")
      .get(`testRound${i}`)
      .get("answers")
      .on((data) => console.log(data));
  }
}
