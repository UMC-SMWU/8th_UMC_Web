import { useSelector as useDefaultSelector, useDispatch as useDefaultDispatch} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../store/store";

export const useDispatch:() => AppDispatch=useDefaultDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;