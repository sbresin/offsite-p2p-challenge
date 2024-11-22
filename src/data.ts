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
    .get("gameturns")
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
    .get("gameturns")
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
    const promises: Promise<void>[] = [];

    gun
      .get("gameturns")
      .map()
      .once((data: Round, roundId: string) => {
        if (data && data.timestamp) {
          promises.push(
            new Promise((res) => {
              rounds.push({ ...data, round_id: roundId });
              res(); // Resolve once this round is processed
            })
          );
        }
      });

    // Wait for all rounds to be processed
    Promise.all(promises).then(() => {
      const sortedRounds = rounds.sort((a, b) => b.timestamp - a.timestamp);
      const lastFiveRounds = sortedRounds.slice(0, 5);
      resolve(lastFiveRounds);
    });
  });
}


export function createBaseRounds() {
  console.log("hello");

  for (let i = 1; i <= 2; ++i) {
    gun
      .get("gameturns")
      .get(`testRound${i}`)
      .get("answers")
      .on((data) => console.log(data));
  }
}
