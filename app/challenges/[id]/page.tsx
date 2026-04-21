export const dynamic = "force-dynamic";

import DeleteButton from "@/components/challenges/DeleteButton";
import { authOptions } from "@/lib/auth";
import { dateFormat } from "@/lib/dateFormat";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Challenges({
  params
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  //  need to add authenticaton to each route to keep code dry through middleware, this will be deleted.
  if (!session) redirect("/auth/login");
	const {id} = await params

  const challenge = await prisma.challenge.findFirst({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!challenge) redirect("/dashboard");

  const dates = dateFormat(challenge?.startDate, challenge?.endDate);

  return (
    <div>
      <a href="/dashboard">Dashboard</a>
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>
      <p>{challenge.goal}</p>
      <p>{dates}</p>
      <p>Active: {challenge.isActive ? "True": "Fasle"}</p>
      <DeleteButton id={id} />
    </div>
  ); 
};
