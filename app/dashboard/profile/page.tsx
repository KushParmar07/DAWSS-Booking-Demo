"use client";

import Title, { Subtitle } from "@/components/title";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function Profile() {
	const user = useAtomValue(currentUserAtom);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user) return redirect("/");

	const submitted = user.tableId;

	return (
		<div className="space-y-2">
			<div>
				<Title>Welcome, {user.name}.</Title>
				<Subtitle>Your email is <b>{user.email}.</b></Subtitle>
			</div>
			<div className="inline-block">
				<Alert variant="default">
					<Info className="h-4 w-4" />
					<AlertTitle>Your selection is currently <b>{submitted ? "submitted!" : "not submitted."}</b></AlertTitle>
					<AlertDescription>
						{submitted ? <p>You may still make changes until June 13th.</p> : <p>Booking is still open until June 13th. <Link className="font-bold underline" href="/dashboard">Submit Now</Link></p>}
					</AlertDescription>
				</Alert>
			</div>
		</div>
	)
}