import React from 'react'

import Heading from '@/components/layouts/Heading/Heading'
// import { checkSubscription } from '@/lib/subscription';
import { Settings } from 'lucide-react'
// import { SubscriptionButton } from '@/components/ui/subscription-button';

const SettingsPage = async () => {

    // const isPro = await checkSubscription();
    const isPro = false;

    return (
        <div className='my-10'>  
            <Heading
                title='Settings'
                description='Manage account settings'
                icon={Settings}
                iconColor='text-gray-700'
                bgColor='text-gray-700/10'
            />
            <div className='px-4 lg:px-8 space-y-4'>
                <div className='text-muted-foreground text-sm'>
                    {isPro ? 'You are currently on a Pro Plan' : 'You are currently on a Free Plan'}
                </div>
                
                {/* <SubscriptionButton isPro={isPro}/> */}
            </div>

        </div>
    )
}

export default SettingsPage
