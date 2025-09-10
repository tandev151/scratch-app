import type { StateCreator } from 'zustand';

export interface PlanSlice {
  currentPlan: string;
  updatePlan: (plan: string) => void;
}

export const createPlanSlice: StateCreator<PlanSlice> = (set) => ({
  currentPlan: 'TNDS O To',
  updatePlan: (plan) =>
    set((state) => {
      if (state.currentPlan !== plan) {
        return { currentPlan: plan };
      }
      return { currentPlan: state.currentPlan };
    }),
});
