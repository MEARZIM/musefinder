import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      new NextResponse("UnAuthorized User", { status: 401 });
    }
    if (!openai) {
      new NextResponse("Api key not configured", { status: 500 });
    }

    if (!messages) {
      new NextResponse("Messages are required", { status: 400 });
    }

<<<<<<< HEAD
    const response = await openai.chat.completions.create({
      model: "ft:gpt-3.5-turbo-0125:personal::A4bCG4IB", // Replace with your fine-tuned model if applicable
      messages: [
        {
          role: "user",
          content:
            messages + "You are a museum booking bot and your name is XenoBot.",
        },
      ],
      max_tokens: 3000,
    });

    // Extract the response message
    const message = response.choices[0]?.message;

    return NextResponse.json(message, { status: 200 });
=======
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: messages,
      model: "gpt-3.5-turbo",
    };

    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    // console.log(chatCompletion)
    return NextResponse.json(chatCompletion.choices[0].message);
>>>>>>> 7b3b6617d0f97e169612658e3e321712cc584775
  } catch (error) {
    console.log("[CONVERSATION ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
