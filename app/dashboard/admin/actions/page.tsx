"use client";

import Title, { Subtitle } from "@/components/title";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function AdminStats() {
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
				<Title>Actions</Title>
				<Subtitle>Click any of the buttons below to change features in the application. Each of these actions <b>are not reversible. Do not click any action more than once, until a notification is seen.</b></Subtitle>
			</div>
			<Separator className="my-4" />
			<div className="max-w-[800px] mt-2">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-y-0 md:gap-x-2">
					Coming Soon...
				</div>
			</div>
		</>
	)
}