import ProgressUpdateForm from "@/components/progress/ProgressUpdateForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DailyProgress({params} : {params : {id: string}}){
	const session = await getServerSession(authOptions);
		//  need to add authenticaton to each route to keep code dry through middleware, this will be deleted.
		if (!session) redirect("/auth/login");
		const { id } = await params
		

	return (
		<ProgressUpdateForm id={id}/>
	)
}