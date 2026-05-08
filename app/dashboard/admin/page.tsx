"use client";
import Title, { Subtitle } from "@/components/title";
import { redirect } from "next/navigation";
import UserTable from './user-table';
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function Admin() {
	const user = useAtomValue(currentUserAtom);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user || !user.role) return redirect("/");

	return (
		<>
			<div>
				<Title>User List</Title>
				<Subtitle>Tick &quot;attending&quot; to allow the user to book a seat. Use the actions on the right side to remove a user&apos;s booking, or set it for them.</Subtitle>
			</div>
			<UserTable />
		</>
	)
}