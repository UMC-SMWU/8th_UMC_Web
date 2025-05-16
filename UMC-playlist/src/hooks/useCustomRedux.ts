import { AppDispatch, RootState } from "../store/store";
import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export const useDispatch: () => AppDispatch = useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
