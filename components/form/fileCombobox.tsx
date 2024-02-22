"use client"

import { useState, useEffect } from "react"

import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const frameworks = [
    {
        "value": "instructions",
        "label": "Instructions",
        "color": "#3498db"
    },
    {
        "value": "rubric",
        "label": "Rubric",
        "color": "#2ecc71"
    },
    {
        "value": "order_document",
        "label": "Order Document",
        "color": "#e74c3c"
    },
    {
        "value": "revision",
        "label": "Revision",
        "color": "#f39c12"
    },
    {
        "value": "grammarly_report",
        "label": "Grammarly Report",
        "color": "#9b59b6"
    },
    {
        "value": "turnitin_report",
        "label": "Turnitin Report",
        "color": "#34495e"
    },
    {
        "value": "other",
        "label": "Other",
        "color": "#95a5a6"
    }
];



export default function FileCombobox({ value, setValue }: any) {
    const [open, setOpen] = useState(false)


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className='bg-red'>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    size={"sm"}
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label || "Other"
                        : "Other"}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>

                    <CommandGroup className='h-48 overflow-y-auto'>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue.toLowerCase().replace(/\s+/g, '_'))
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
