import type { StateCreator } from 'zustand';

export interface UISlice {
  step: number;
  updateStep: (step: number) => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
  step: 0,
  updateStep: (newStep) => set(() => ({ step: newStep })),
});
