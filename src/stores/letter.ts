import { defineStore } from "pinia";

export const useLetter = defineStore({
  id: "letter",
  state: () => ({
    currentLetterIndex: 0,
    randomLetter: '' as string,
    answer: {} as Record<string, string>,
  }),
  actions: {
    startLetterSequence() {
      const letters = 'SQARDCLPTKYZXFBWOENJHIMUGV';
      this.randomLetter = letters[this.currentLetterIndex];

      setInterval(() => {
        this.currentLetterIndex = (this.currentLetterIndex + 1) % letters.length;
        this.randomLetter = letters[this.currentLetterIndex];
      }, 2 * 60 * 1000);
    },
    addAnswers(category: string, answer: string) {
      this.answer[category] = answer;
    },
  },
});
