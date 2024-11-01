import { NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server';

import { db } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrlForStripe } from "@/lib/utils";

const settingsUrl = absoluteUrlForStripe("/settings");


export async function POST(
    req: Request
) {
    try {

        const { userId } = auth();
        const user = await currentUser();

        const body = await req.json();
        const { value, museumId, totalPrice } = body;
        console.log(value)

        if (!userId || !user) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types:["card"],
            mode: "payment",
            billing_address_collection: "auto",
            customer_email: user?.emailAddresses[0].emailAddress,
            line_items: [{
                price_data: {
                    currency:"USD",
                    product_data:{
                        name: "MuseFine Booking Service",
                        description: "Book your museum ticket quickly"
                    },
                    unit_amount: totalPrice * 100,
                },
                quantity: value.adultTickets,
            }],
            metadata: {
                userId,
                museumId,
            }
        });

        return new NextResponse(JSON.stringify({
            url: stripeSession
        }));
        
    } catch (error) {
        console.log("[STRIPE ERROR]",error)
        return new NextResponse("Internal Server Error", {
            status: 500
        })
    }
}