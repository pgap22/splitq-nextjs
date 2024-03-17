import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export default function IconBox({className, Icon, variant, size = 22, onClick}) {
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
        <div onClick={onClick} className={cn(className,iconvariants({variant}))}>
          <Icon size={size} />
        </div>
    )
  }
  