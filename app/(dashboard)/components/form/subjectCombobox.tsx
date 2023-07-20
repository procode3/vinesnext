"use client"

import { useState, useEffect }  from "react"

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
    "value": "mathematics",
    "label": "Mathematics"
    },
    {
    "value": "geography",
    "label": "Geography"
    },
    {
    "value": "economics",
    "label": "Economics"
    },
    {
    "value": "biology",
    "label": "Biology"
    },
    {
    "value": "physics",
    "label": "Physics"
    },
    {
    "value": "history",
    "label": "History"
    },
    {
    "value": "chemistry",
    "label": "Chemistry"
    },
    {
    "value": "computer science",
    "label": "Computer Science"
    },
    {
    "value": "political science",
    "label": "Political Science"
    },
    {
    "value": "psychology",
    "label": "Psychology"
    },
    {
    "value": "social science",
    "label": "Social Science"
    },
    {
    "value": "accountancy",
    "label": "Accountancy"
    },
    {
    "value": "sociology",
    "label": "Sociology"
    },
    {
    "value": "physical education",
    "label": "Physical Education"
    },
    {
    "value": "philosophy",
    "label": "Philosophy"
    },
    {
    "value": "environmental science",
    "label": "Environmental Science"
    },
    {
    "value": "law",
    "label": "Law"
    },
    {
    "value": "home science",
    "label": "Home Science"
    },
    {
    "value": "business studies",
    "label": "Business Studies"
    },
    {
    "value": "botany",
    "label": "Botany"
    },
    {
    "value": "zoology",
    "label": "Zoology"
    },
    {
    "value": "humanities",
    "label": "Humanities"
    },
    {
    "value": "anthropology",
    "label": "Anthropology"
    },
    {
    "value": "literature",
    "label": "Literature"
    }
]

export default function SubjectCombobox({ value, setValue }) {
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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select subject..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandGroup className='h-48 overflow-y-auto'>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
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
