import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 transition-ripple",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-ripple",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-ripple",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-ripple",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-ripple",
        link: "text-primary underline-offset-4 hover:underline transition-ripple",
        // Water-themed variants using design system
        ocean: "bg-gradient-ocean text-primary-foreground hover:opacity-90 shadow-water transition-flow",
        aqua: "bg-gradient-aqua text-primary-foreground hover:opacity-95 shadow-mist transition-flow",
        flow: "bg-gradient-flow text-foreground hover:shadow-flow transition-flow border border-primary/20",
        wave: "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-ripple backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
