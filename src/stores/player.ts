import {defineStore} from "pinia";

export const usePlayer = defineStore({
  id: "player",
  state: () => ({
    name: '' as string,
  }),

  actions: {
    async addName(name: string) {
      this.name = name;
    },
  },
});
