// export const dynamic = "force-dynamic";

import EditChallengeForm from "@/components/challenges/EditChallengeForm";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Challenges({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  //  need to add authenticaton to each route to keep code dry through middleware, this will be deleted.
  if (!session) redirect("/auth/login");
  const { id } = await params;

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!challenge) redirect("/dashboard");

  return (
    <div>
      <a href="/dashboard">Dashboard</a>
			<EditChallengeForm challenge={challenge}/>
    </div>
  );
}
