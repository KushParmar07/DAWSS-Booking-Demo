"use client";
import SeatsGrid from "./seats-grid";
import { redirect } from "next/navigation";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function Book() {
	const user = useAtomValue(currentUserAtom);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user) {
		return redirect("/");
	}

	return (
		<div>
			<SeatsGrid
				currentUserId={user.id}
				currentUserHasGuest={user.hasGuest ?? false}
				initialTableId={user.tableId}
				currentUserTableId={user.tableId}
				currentUserRole={user.role ?? false}
				showTitle={true}
			/>
		</div>
	);
}
