import { NextResponse } from "next/server";
import { auth, currentUser } from '@clerk/nextjs/server';

import { db } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrlForStripe } from "@/lib/utils";

const settingsUrl = absoluteUrlForStripe("/settings");


export async function GET() {
    try {

        const { userId } = auth();
        const user = await currentUser();

        if (!userId || !user) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }

        // const userSubscription = await db.userSubScription.findUnique({
        //     where:{
        //         userId: userId!
        //     }
        // })


        // if (userSubscription && userSubscription.stripeCustomerId) {
        //     const stripeSession = await stripe.billingPortal.sessions.create({
        //         customer: userSubscription.stripeCustomerId,
        //         return_url: settingsUrl
        //     });

        //     return new NextResponse(JSON.stringify({url: stripeSession.url}));
        // }

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
                        name: "National Museum Booking Service",
                        description: "Unlimited AI Generations"
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            }],
            metadata: {
                userId,
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