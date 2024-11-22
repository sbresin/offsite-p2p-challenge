import Gun from "gun";
import { Answer, Round } from "./types";

// import Gun from 'gun/gun'
// import SEA from 'gun/sea.js'
// import 'gun/lib/radix'
// import 'gun/lib/radisk'
// import 'gun/lib/store'
// import 'gun/lib/rindexed'
// import 'gun/lib/webrtc'
// import 'gun/nts'
// export const gun = Gun({peers: ['https://your.gun.peer'], localStorage:false})

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun"] });

// Add an answer to a round
//

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

export function createBaseRounds() {
  // gun.get("example").once((data) => {
  //   if (data) {
  //     Object.keys(data).forEach((key) => {
  //       gun.get("test").get(key).put(null);
  //     });
  //   }
  // });

  gun.get("example").on((data) => console.log(data));
}
