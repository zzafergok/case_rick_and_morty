import { create } from 'zustand'

interface FilterState {
  status: string | null
  gender: string | null
  setStatus: (status: string | null) => void
  setGender: (gender: string | null) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  status: null,
  gender: null,
  setStatus: (status) => set({ status }),
  setGender: (gender) => set({ gender }),
  resetFilters: () => set({ status: null, gender: null }),
}))
