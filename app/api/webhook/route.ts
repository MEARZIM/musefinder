import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prismadb";


export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {

        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOKS_SECRET!
        )


    } catch (error: any) {
        console.log(error);
        return new NextResponse(`WebHooks Error: ${error.message}`, {
            status: 400
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session);

    if (event.type === "checkout.session.completed") {

        if (!session?.metadata?.userId) {
            return new NextResponse("UserId is required", {
                status: 400
            });
        }

        await db.userBookedTicket.create({
            data: {
              userId: session.metadata.userId,
              museum: {
                connect: {
                  id: session.metadata.museumId,
                },
              },
            },
          });
       
    }


    return new NextResponse(null, {
        status: 200
    });
}
