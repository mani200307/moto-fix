import { create } from 'zustand';

export const useCheckAvail = create((set) => ({
    avail: false,
    setAvail: (newAvail) => set({ avail: newAvail }),
}));