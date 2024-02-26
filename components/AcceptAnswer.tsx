import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  completed: z.boolean().default(false).optional(),
})

export default function AcceptAnswer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      completed: true,
    },
  })

  const watchCheckbox = form.watch("completed");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      description: (
        'Order has been completed'
      ),
    })
  }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Accept Answer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Accept Answer</DialogTitle>
					<DialogDescription className="text-xs">
						
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className=" leading-none">
              
                <FormDescription>
                        By accepting the answer, you confirm its finalization. Are you sure
						you wish to proceed? Once accepted, the order will be considered
						satisfactory and completed. Your satisfaction is our priority.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!watchCheckbox}>Accept</Button>
      </form>
    </Form>

				<DialogFooter>
                    
                </DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
