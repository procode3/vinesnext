

import { useState, useEffect, useMemo } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { useSession } from 'next-auth/react'

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

interface Writer {
  id: number,
  name: string,
  email: string,
  role: {
    id: number,
    name: string,
    description: string,
    type: string,
    createdAt: string,
    updatedAt: string,
  },
  confirmed: boolean,
  createdAt: string,
  updatedAt: string,
  orders: any[],
  provider: string,
  clientOrders: any[],
}


export default function UsersCombobox({ httpHook, form, formField }: any) {
  const [open, setOpen] = useState(false);
  const [writers, setWriters] = useState<Writer[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    httpHook(session)
      .then((res: any) => {
        setWriters(res?.data);
      });
  }, []);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          onChange={form.setValue(formField, writers?.find((writer) => writer.name === selectedUser)?.id)}
        >
          {writers && writers?.length > 0 && selectedUser
            ? writers?.find((writer) => writer.name === selectedUser)?.name
            : "Select one..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandGroup className="h-48 overflow-y-auto">
            {writers && writers?.map((writer) => (
              <CommandItem
                key={writer.id}
                onSelect={() => {
                  setSelectedUser((prevWriter) => (
                    prevWriter === writer.name ? "Loading..." : writer.name
                  ));
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedUser === writer.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {writer.name}

              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};