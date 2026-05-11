"use client";

import { usePathname } from 'next/navigation'
import BookSidebar from "./(book)/book-sidebar";
import { SeatsGridProps } from './(book)/shared';

export default function ShowSidebar({ currentUserId, currentUserHasGuest, initialTableId, currentUserRole }: SeatsGridProps) {
	const pathname = usePathname()

	return (
		<>
			{(pathname.endsWith("/dashboard") || pathname.includes("/dashboard/admin/set")) && <BookSidebar currentUserId={currentUserId}
				currentUserHasGuest={currentUserHasGuest ?? false}
				initialTableId={initialTableId}
				currentUserRole={currentUserRole ?? false} />}
		</>
	)
}