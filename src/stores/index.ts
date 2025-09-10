import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { type PlanSlice, createPlanSlice } from './createPlanSlice';
import { type UISlice, createUISlice } from './createUISlice';

type StoreState = UISlice & PlanSlice;

export const useStore = create<StoreState>()(
  // Devtool wrapper to watch everything
  devtools(
    persist(
      (...args) => ({
        ...createUISlice(...args),
        ...createPlanSlice(...args),
      }),
      // Options to pick specific state need to persist
      {
        name: 'app-storage', //Storage key
        partialize: (state) => ({
          step: state.step, //Example
        }),
      },
    ),
  ),
);
