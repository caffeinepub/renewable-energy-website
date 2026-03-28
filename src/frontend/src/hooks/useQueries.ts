import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useQuizScores() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["quizScores"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizScores();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuizScore() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      userId,
      score,
      totalQuestions,
    }: { userId: string; score: bigint; totalQuestions: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitQuizScore(userId, score, totalQuestions);
    },
  });
}
