"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react" // Using Plus for the custom icon

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-gray-700", className)} // Updated border and removed background/rounded
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 py-4 text-start text-xl font-semibold transition-all text-white", // Updated text size and removed hover:underline
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {/* Custom icon structure to match the provided HTML */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg bg-transparent px-2 py-4 transition-all">
        <span className="relative z-20 flex items-center justify-center">
          {/* Plus icon: rotates 90deg when open to appear as a horizontal line */}
          <Plus className="h-6 w-6 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90 text-gray-400" />
        </span>
        {/* Animated purple background on hover */}
        <span className="absolute inset-0 z-10 rounded-lg bg-purple-500 transition-transform duration-500 translate-y-[50%] scale-0 group-hover:translate-y-0 group-hover:scale-x-[150%] group-hover:scale-y-[220%]"></span>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-base text-gray-300 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "px-6 pb-6 md:pr-16 prose prose-invert max-w-none [&>p:last-child]:mb-0 [&>p>a:hover]:text-gray-200 [&>p>a]:underline [&>p]:mb-8", // Updated padding and added prose/link styles
      className,
    )}
    {...props}
  >
    <div className="pb-0">{children}</div> {/* Removed extra pb-6 from inner div */}
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
