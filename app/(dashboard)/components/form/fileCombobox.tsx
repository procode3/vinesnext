"use client"

import { useState, useEffect } from "react"

import { Check, ChevronsUpDown } from "lucide-react"

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
        "label": "Instructions"
    },
    {
        "value": "rubric",
        "label": "Rubric"
    },
    {
        "value": "order_document",
        "label": "Order Document"
    },
    {
        "value": "revision",
        "label": "Revision"
    },
    {
        "value": "grammarly_report",
        "label": "Grammarly Report"
    },
    {
        "value": "turnitin_report",
        "label": "Turnitin Report"
    },
    {
        "value": "other",
        "label": "Other"
    }
]


export default function FileCombobox({ value, setValue }: any) {
    const [open, setOpen] = useState(false)


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label || "Other"
                        : "Other"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search type..." />
                    <CommandEmpty>Not found.</CommandEmpty>
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
