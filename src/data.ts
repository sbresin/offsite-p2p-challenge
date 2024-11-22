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
    // const promises: Promise<void>[] = [];

    gun
      .get("ecir")
      .map()
      .once((data: Round, roundId: string) => {
        if (data && data.timestamp) {
          // Log each round as it's retrieved
          console.log(
            `Fetched round: ${roundId}, Timestamp: ${data.timestamp}`,
          );
          rounds.push({ ...data, round_id: roundId });
        }
      });

    // Listen for changes and resolve once the data is completely loaded
    gun
      .get("ecir")
      .map()
      .once(() => {
        // Log before sorting the rounds
        console.log("Sorting rounds by timestamp...");

        // Sort the rounds by timestamp in descending order
        const sortedRounds = rounds.sort((a, b) => b.timestamp - a.timestamp);

        // Slice the first 5 rounds
        const lastFiveRounds = sortedRounds.slice(0, 5);

        // Log the sorted rounds
        console.log("Last five rounds:", lastFiveRounds);

        // Resolve the promise with the last five rounds
        resolve(lastFiveRounds);
      });
  });
}

export function getSomeRoundsForTests() {
  console.log("hello");

  for (let i = 1; i <= 2; ++i) {
    gun
      .get("ecir")
      .get(`testRound${i}`)
      .get("answers")
      .on((data) => console.log(data));
  }
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

export function getAlphabetFromMinuteOfDay(dateTime: Date | string): string {
  // Convert the input to a Date object
  const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;

  // Validate the date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Calculate the total minutes past midnight
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  // Define the alphabet
  const alphabet = "YZDWXABCTEFGHIJKLMNOPQRSTUVW";

  // Map the total minutes to a letter
  const letterIndex = totalMinutes % alphabet.length;

  // Return the corresponding letter
  return alphabet[letterIndex];
}
