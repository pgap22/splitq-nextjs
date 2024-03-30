import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import React from "react"


export default React.forwardRef(function IconBox({className, Icon, variant, size = 22, onClick, ...props},ref) {
  const iconvariants = cva("w-10 aspect-square border flex items-center justify-center",{
    variants: {
      variant:{
        gradientCircle: "border-gradient bg-gradient-principal rounded-full",
        square: "rounded-md bg-foreground border-border",
        squareGradient: "border-gradient bg-gradient-principal rounded-md"
      }
    },
    defaultVariants:{
      variant: "gradientCircle"
    }
  })
  return (
      <button  {...props} ref={ref} onClick={onClick} className={cn(className,iconvariants({variant}))}>
        <Icon size={size} />
      </button>
  )
})
  