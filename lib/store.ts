import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserType } from '@/app/dashboard/(book)/shared';

// Generate dummy data
const DUMMY_USERS: UserType[] = [
  { id: "admin-1", name: "Admin Teacher", email: "admin@school.demo", role: true, attending: true, hasGuest: false, tableId: 1 },
];

for (let i = 1; i <= 60; i++) {
  const isAttending = Math.random() > 0.1;
  const hasGuest = isAttending && Math.random() > 0.7;
  // Place them randomly in tables 1 to 30, or no table
  const tableId = isAttending && Math.random() > 0.2 ? Math.floor(Math.random() * 30) + 1 : undefined;

  DUMMY_USERS.push({
    id: `student-${i}`,
    name: `Student ${i}`,
    email: `student${i}@school.demo`,
    role: false,
    attending: isAttending,
    hasGuest: hasGuest,
    tableId: tableId,
  });
}

export const usersAtom = atomWithStorage<UserType[]>('demo-users', DUMMY_USERS);
export const currentUserIdAtom = atomWithStorage<string | null>('demo-current-user-id', null);

export const currentUserAtom = atom(
  (get) => {
    const users = get(usersAtom);
    const currentId = get(currentUserIdAtom);
    return users.find(u => u.id === currentId) || null;
  }
);
