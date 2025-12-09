import { create } from "zustand";

interface UiStore {
	// Desktop: sidebar expandido (true) o colapsado (false)
	isExpanded: boolean;
	// Móvil: sidebar abierto (true) o cerrado (false)
	isMobileOpen: boolean;
	
	// Acciones
	toggleExpanded: () => void;
	toggleMobileOpen: () => void;
	closeMobileMenu: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
	isExpanded: true,
	isMobileOpen: false,

	toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
	toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
	closeMobileMenu: () => set({ isMobileOpen: false }),
}));
