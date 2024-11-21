// src/store/themeStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => {
        const newIsDarkMode = !state.isDarkMode;
        if (newIsDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: newIsDarkMode };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export default useThemeStore;