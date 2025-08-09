import type { EffectCallback } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMount = (fn: EffectCallback) => useEffect(fn, []);
