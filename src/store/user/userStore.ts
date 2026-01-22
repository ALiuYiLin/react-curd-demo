import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createUISlice } from './slices/uiSlice'
import  { createOptionSlice } from './slices/optionSlice'
import { createBaseSlice } from './slices/baseSlice'
import type { Base, Options, UI } from './types'

export type AppState = Base & UI & Options

export const useAppStore = create<AppState>()(
  devtools(
    (...args) => ({
      ...createBaseSlice(...args),
      ...createUISlice(...args),
      ...createOptionSlice(...args),
    }),
    { name: 'app-store' }
  )
)
