"use client";

import SeatsGrid from "@/app/dashboard/(book)/seats-grid";
import Title, { Subtitle } from "@/components/title";
import { redirect, useParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { currentUserAtom, usersAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function AdminSet() {
	const user = useAtomValue(currentUserAtom);
	const users = useAtomValue(usersAtom);
	const params = useParams();
	const id = params.id as string;

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user || !user.role) return redirect("/");

	if (!id) return <>User does not exist.</>;

	const referencedUser = users.find(u => u.id === id);

	if (!referencedUser) return <>User does not exist.</>;

	return (
		<>
			<div>
				<Title>Manual Edit</Title>
				<Subtitle>Choose where to place this person. If a seat is already taken, it will remove the booking of the existing person.</Subtitle>
			</div>
			<SeatsGrid userId={id} currentUserHasGuest={referencedUser.hasGuest || false} currentUserRole={user.role || false} />
		</>
	)
}