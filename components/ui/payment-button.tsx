"use client"

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "./button";


interface Props {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro = false
} : Props) => {

    const [loading, setLoading] = useState(false);

    async function handleClick() {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe");

            if(typeof(response.data.url) === "object"){
                window.location.href = response.data.url.url;
            } else {
                window.location.href = response.data.url;
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <Button variant={isPro ? "default" : "outline"} onClick={handleClick} disabled={loading}>
            {isPro ? "Manage Subscription" : " Upgrade"}
            {!isPro && <Zap className="w-4 h-4 fill-white" />}
        </Button>
        </>
    )
}