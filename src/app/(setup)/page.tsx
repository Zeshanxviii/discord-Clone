import { redirect } from "next/navigation";
import initialProfile from "../../../libs/initial-profile"
import { db } from "../../../libs/db";
import { InitialModel } from "@/components/models/initial-model";

const SetupPage = async() => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where:{
            member: {
                some: {
                    profileId: profile.userId
                }
            }  
        }
    });

    if(server)
    {
        return redirect(`/servers/${server.id}`);
    }
    return (  
        <div>
            <InitialModel/>
        </div>
    );
}
 
export default SetupPage;