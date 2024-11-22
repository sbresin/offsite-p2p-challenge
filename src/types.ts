export interface Answer {
  playerName: string; // Name of the player
  category: string; // Category for the answer
  answer: string; // The actual answer
}

export interface Round {
  round_id: string; // Unique identifier for the round
  answers: Answer[]; // List of answers for the round
  timestamp: number; // Timestamp to track round order
  isFinished: Boolean;
}
