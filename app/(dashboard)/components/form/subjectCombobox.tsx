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
    "value": "mathematics",
    "label": "Mathematics"
  },
  {
    "value": "science",
    "label": "Science"
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
    "value": "biology",
    "label": "Biology"
  },
  {
    "value": "economics",
    "label": "Economics"
  },
  {
    "value": "humanities",
    "label": "Humanities"
  },
  {
    "value": "geography",
    "label": "Geography"
  },
  {
    "value": "physics",
    "label": "Physics"
  },
  {
    "value": "psychology",
    "label": "Psychology"
  },
  {
    "value": "computerScience",
    "label": "Computer Science"
  },
  {
    "value": "socialScience",
    "label": "Social Science"
  },
  {
    "value": "sociology",
    "label": "Sociology"
  },
  {
    "value": "engineering",
    "label": "Engineering"
  },
  {
    "value": "business",
    "label": "Business"
  },
  {
    "value": "physicalEducation",
    "label": "Physical Education"
  },
  {
    "value": "statistics",
    "label": "Statistics"
  },
  {
    "value": "law",
    "label": "Law"
  },
  {
    "value": "politicalScience",
    "label": "Political Science"
  },
  {
    "value": "philosophy",
    "label": "Philosophy"
  },
  {
    "value": "astronomy",
    "label": "Astronomy"
  },
  {
    "value": "accounting",
    "label": "Accounting"
  },
  {
    "value": "businessStudies",
    "label": "Business Studies"
  },
  {
    "value": "english",
    "label": "English"
  },
  {
    "value": "other",
    "label": "Other"
  }
]


export default function SubjectCombobox({ value, setValue }: any) {
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
