import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type NavCtx = {
  /** while true the menu bar stays visible regardless of scroll direction */
  pinned: boolean;
  setPinned: (pinned: boolean) => void;
};

const Ctx = createContext<NavCtx>({ pinned: false, setPinned: () => {} });

export function NavProvider({ children }: { children: ReactNode }) {
  const [pinned, setPinned] = useState(false);
  const value = useMemo(() => ({ pinned, setPinned }), [pinned]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNav() {
  return useContext(Ctx);
}
