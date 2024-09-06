"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { MuseumProps, Skeleton } from "../page"
import axios from "axios"

const formSchema = z.object({
    date: z.date({
        required_error: "A date of visit is required.",
    }),
    adultTickets: z.number().min(1, "At least one adult ticket is required."),
})

const page = ({
    params
}: {
    params: {
        id: string
    }
}) => {

    const [museums, setMuseums] = useState<MuseumProps>();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [date, setDate] = useState<Date | undefined>(undefined)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adultTickets: 1,
        },
    })

    const adultPrice = museums?.ticketPrice;
    const childPrice = 8


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Here you would typically send the data to your backend
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)



    const getAllMuseumLists = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/museum", {
                id: params.id,
            });
            setMuseums(response.data);
            console.log(response.data)
        } catch (error) {
            console.log("Error fetching museum data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllMuseumLists();
        
        // Only calculate totalPrice if adultPrice is defined
        if (adultPrice !== undefined) {
            setTotalPrice((form.watch("adultTickets") || 0) * adultPrice);
        }
      }, [params.id, adultPrice]);
      

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {Array(9)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} />
                    ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{museums?.name} Museum Ticket Booking</CardTitle>
                    <CardDescription>Select your visit date and number of tickets</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Visit Date</FormLabel>
                                        <FormControl>
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(newDate) => {
                                                    setDate(newDate)
                                                    field.onChange(newDate)
                                                }}
                                                className="rounded-md border w-fit"
                                                disabled={(date) => date < today}
                                                initialFocus
                                            />
                                        </FormControl>
                                        <FormDescription>Select the date of your visit.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           
                                <FormField
                                    control={form.control}
                                    name="adultTickets"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adult Tickets {museums?.ticketPrice} {`/-`}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                    className="w-full"
                                                />
                                            </FormControl>
                                            <FormDescription>Number of adult tickets.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                               
                            
                            <div className="grid gap-2">
                                <h3 className="text-lg font-semibold">Booking Summary</h3>
                                <p>Date: {date?.toDateString() || "Not selected"}</p>
                                <p>Adult Tickets: {form.watch("adultTickets") || 0}</p>
                                <p className="text-xl font-bold">Total Price: {totalPrice} {`/-`}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Proceed to Checkout</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default page
