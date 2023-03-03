import { tv } from 'tailwind-variants';

export const appContent = tv({
  base: 'max-w-7xl mx-auto px-2 sm:px-4 py-8 pb-16',
  variants: {
    padding: {
      noY: 'py-0',
      noX: '',
    },
  },
  //     size: {
  //       sm: "text-sm",
  //       md: "text-base",
  //       lg: "px-4 py-3 text-lg",
  //     },
  //   },
  //   compoundVariants: [
  //     {
  //       size: ["sm", "md"],
  //       class: "px-3 py-1",
  //     },
  //   ],
  //   defaultVariants: {
  //     size: "md",
  //     color: "primary",
  //   }
});

export const projectTablePaper = tv({
  base: '',
});

//LIST
export const listItems = tv({
  base: 'flex flex-col gap-2',
});
export const listItem = tv({
  base: 'border-0 border-b grid grid-cols-2',
});
