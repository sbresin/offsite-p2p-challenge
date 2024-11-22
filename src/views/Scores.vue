<script setup lang="ts">
import { ref, computed } from 'vue'

type scoredAnswer = { answer: string, score: number };

import { fetchLastFiveRounds } from "../data";


const roundsdata = ref([
  { key: "round1", submissions: [] },
  { key: "round2", submissions: [] },
  { key: "round3", submissions: [{ player: "munam", answers: { city: "Amsterdam" } }, { player: "ecir", answers: { city: "Anaheim" } }, { player: "ali", answers: { city: "Amsterdam" } }] }
]);

// let roundsdata = ref([]);
// roundsdata = fetchLastFiveRounds();

const scores = computed(() => {
  return roundsdata.value.map(round => {
    const allAnswersByCategory = round.submissions.reduce((aggregated, submission) => {
      Object.entries(submission.answers).forEach(([key, value]) => {
        if (!aggregated.has(key)) {
          aggregated.set(key, new Array<string>());
        }
        aggregated.get(key).push(value)
      });
      return aggregated;
    }, new Map<string, string[]>());

    // todo for each player, loop answers key and value
    const scoredSubmissions = round.submissions.map(submission => {
      const scoredAnswers: { [key: string]: scoredAnswer } = Object.entries(submission.answers).reduce((answersObj, [key, value]) => {
        let score = 0;
        if (value) {
          const answers = allAnswersByCategory.get(key);
          score = answers.filter(answer => answer === value).length > 1 ? 1 : 2;
        };
        answersObj[key] = { answer: value, score };
        return answersObj;

      }, {});
      return { ...submission, totalScore: Object.values(scoredAnswers).reduce((sum, { score }) => sum + score, 0), answers: scoredAnswers };
    });

    return {
      ...round,
      submissions: scoredSubmissions
    };
  });
});

const latestRound = computed(() => {
  return scores.value[scores.value.length - 1];
});
</script>

<template>
  <h2 class="text-lg text-nowrap">Leaderboard (next round starts in
    <CountDown class="nogrow" :even="false" />)
  </h2>
  <div class="flex flex-col items-center h-screen w-full">

    <div class="grow">
      <table v-if="latestRound"
        class="table-auto text-nowrap nowrap border-spacing-2 border border-slate-500 flex-grow">
        <thead>
          <tr>
            <th class="border border-slate-600 p-2">Player</th>
            <th class="border border-slate-600 p-2">Score</th>
            <th class="border border-slate-600 p-2">City</th>
            <th class="border border-slate-600 p-2">Country</th>
            <th class="border border-slate-600 p-2">River</th>
            <th class="border border-slate-600 p-2">Tech Lingo</th>
            <th class="border border-slate-600 p-2">BVG station</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(submission, index) in latestRound.submissions">
            <td class="border border-slate-600 p-2"><span v-if="index === 0">🥇</span><span
                v-if="index === 1">🥈</span><span v-if="index === 2">🥉</span>
              {{ submission.player }}</td>
            <td class="border border-slate-600 p-2">{{ submission.totalScore }}</td>
            <td class="border border-slate-600 p-2"><span v-if="submission.answers['city']">{{
              submission.answers["city"].answer
                }}
                ({{
                  submission.answers["city"].score }}) </span></td>
            <td class="border border-slate-600 p-2"><span v-if="submission.answers['country']">{{
              submission.answers["country"].answer }} ({{
                  submission.answers["country"].score }})</span></td>
            <td class="border border-slate-600 p-2"><span v-if="submission.answers['river']">{{
              submission.answers["river"].answer
                }} ({{
                  submission.answers["river"].score }})</span></td>
            <td class="border border-slate-600 p-2"><span v-if="submission.answers['tech']">{{
              submission.answers["tech"].answer
                }}
                ({{
                  submission.answers["tech"].score }})</span></td>
            <td class="border border-slate-600 p-2"><span v-if="submission.answers['bvg']">{{
              submission.answers["bvg"].answer
                }}
                ({{
                  submission.answers["bvg"].score }})</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
