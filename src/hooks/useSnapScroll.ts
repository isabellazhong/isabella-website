import { useEffect } from "react";

/** enables gentle scroll snapping for the page while the component is mounted */
export function useSnapScroll() {
  useEffect(() => {
    document.documentElement.classList.add("snap-scroll");
    return () => document.documentElement.classList.remove("snap-scroll");
  }, []);
}
