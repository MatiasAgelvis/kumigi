import React, { useEffect, useRef } from "react";

const useDidMountEffect = (func: Function, deps: Array<unknown>) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, [func, ...deps]);
};

export default useDidMountEffect;
