import { BREAKPOINTS } from "@/constants";
import { useEffect, useState } from "react";
import { useBreakpoint } from "use-breakpoint";

export const useBreakpointValue = (acceptedBreakpoints: string[] = []) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [_breakpointValue, _setBreakpointValue] = useState(false);
  const breakpointValue = acceptedBreakpoints.includes(breakpoint as string);

  useEffect(() => {
    _setBreakpointValue(breakpointValue);
  }, [breakpointValue]);

  return _breakpointValue;
};
