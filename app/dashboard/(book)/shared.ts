import { atom } from 'jotai';
import { usersAtom } from '@/lib/store';

export const TABLE_CAPACITY = 10;

export interface UserType {
	id: string;
	name: string;
	email: string;
	role: boolean;
	seatId?: number;
	tableId?: number;
	attending: boolean;
	hasGuest: boolean;
}

export interface TableType {
	id: number;
	users: UserType[]
}

export interface SeatsGridProps {
	currentUserId?: string;
	currentUserHasGuest: boolean;
	userId?: string;
	initialTableId?: number | null;
	currentUserRole?: boolean;
	showTitle?: boolean;
}

export const calculateEffectiveOccupancy = (tableUsers: UserType[] | undefined): number => {
	if (!tableUsers) return 0;
	return tableUsers.reduce((acc, user) => acc + (user.hasGuest ? 2 : 1), 0);
};

export const getSpotsNeededForBookingUser = (currentUserId?: string, userId?: string, userBeingBooked?: UserType, currentUserHasGuest?: boolean) => {
	if (userId && userId !== currentUserId) {
		if (userBeingBooked) {
			return userBeingBooked.hasGuest ? 2 : 1;
		}
		return 1;
	}
	return currentUserHasGuest ? 2 : 1;
};

export const tablesAtom = atom<TableType[]>((get) => {
	const users = get(usersAtom);
	const tablesMap = new Map<number, UserType[]>();
	// Generate 30 empty tables by default
	for (let i = 1; i <= 30; i++) {
		tablesMap.set(i, []);
	}
	// Place users into tables
	users.forEach(u => {
		if (u.tableId) {
			const t = tablesMap.get(u.tableId);
			if (t) t.push(u);
		}
	});
	const tables: TableType[] = [];
	for (let i = 1; i <= 30; i++) {
		tables.push({ id: i, users: tablesMap.get(i) || [] });
	}
	return tables;
});
export const table = atom("");
export const tableInfo = atom<TableType | null>(null);
export const myTableAtom = atom("");
export const hasGuestAtom = atom(false);

//State Atoms
export const tableSidebarState = atom(false);
export const newBookingAtom = atom(false);