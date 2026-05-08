"use client";
import Sidebar from "@/components/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import ShowSidebar from "./showSidebar";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/lib/store";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = useAtomValue(currentUserAtom);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <Loader />;

	if (!user) return redirect("/");

	return (
		<SidebarProvider>
			<Sidebar user={user} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumbs />
					</div>
				</header>
				<div className='m-6'>
					{children}
				</div>
			</SidebarInset>
			<ShowSidebar currentUserId={user.id}
				currentUserHasGuest={user.hasGuest ?? false}
				initialTableId={user.tableId}
				currentUserTableId={user.tableId}
				currentUserRole={user.role ?? false} />
		</SidebarProvider>
	);
}
