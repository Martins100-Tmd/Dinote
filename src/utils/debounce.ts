export const debounceFn = (func: Function, delay: number) => {
   let debounceTimer: any;
   return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
   };
};
