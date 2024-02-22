"use client"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface assignOrderProps {
    writerId: "string"
    orderId: "string"
}
export  function AssignOrder({ writerId, orderId }: assignOrderProps) {

    return (

        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">

                <Label htmlFor="name" className="text-right">
                    Writer
                </Label>
                <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Deadline
                </Label>
                <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                />
            </div>
        </div>
    )
}
