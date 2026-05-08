"use client";

import Title, { Subtitle } from "@/components/title";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAtomValue } from "jotai";
import { currentUserAtom, usersAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function AdminStats() {
	const user = useAtomValue(currentUserAtom);
	const users = useAtomValue(usersAtom);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user || !user.role) return redirect("/");

	const totalUsers = users.length;
	const totalAttending = users.filter(u => u.attending).length;
	const totalGuests = users.filter(u => u.hasGuest).length;
	const totalBooked = users.filter(u => u.tableId !== undefined && u.tableId !== null).length;

	return (
		<>
			<div>
				<Title>Statistics</Title>
				<Subtitle>See information about users and their bookings.</Subtitle>
			</div>
			<Separator className="my-4" />
			<div className="max-w-[800px] mt-2">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-2 lg:gap-y-0 md:gap-x-2">
					<Card className="gap-0 w-full">
						<CardHeader className="text-sm text-muted-foreground">
							Total Users
						</CardHeader>
						<CardContent>
							<h1 className="text-3xl font-bold">{totalUsers}</h1>
						</CardContent>
					</Card>
					<Card className="gap-0 w-full">
						<CardHeader className="text-sm text-muted-foreground">
							Total Attendees
						</CardHeader>
						<CardContent>
							<h1 className="text-3xl font-bold">{totalAttending}</h1>
						</CardContent>
					</Card>
					<Card className="gap-0 w-full">
						<CardHeader className="text-sm text-muted-foreground">
							Total Booked
						</CardHeader>
						<CardContent>
							<h1 className="text-3xl font-bold">{totalBooked}</h1>
						</CardContent>
					</Card>
					<Card className="gap-0 w-full">
						<CardHeader className="text-sm text-muted-foreground">
							Total Guests
						</CardHeader>
						<CardContent>
							<h1 className="text-3xl font-bold">{totalGuests}</h1>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	)
}