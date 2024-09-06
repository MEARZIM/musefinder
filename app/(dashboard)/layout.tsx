// import { getApiLimitCount } from "@/lib/api-limit"
import { SidebarLayout } from "@/components/layouts/dashboard/sidebar-layout"
// import { checkSubscription } from "@/lib/subscription";

const DashBoardLayout = async ({ children }: { children: React.ReactNode }) => {
    // const apiLimitCount = await getApiLimitCount();
    // const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <div className="md:flex md:w-72 md:fixed md:flex-col md:inset-y-0 bg-gray-900  text-white" >
                <div>
                   <SidebarLayout apiLimitCount={7} isPro={false}/>
                </div>
            </div>
            <main className="md:pl-72"> 
                {children}
            </main>
           
        </div>
    )
}

export default DashBoardLayout