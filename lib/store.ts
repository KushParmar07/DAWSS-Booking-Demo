import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserType } from '@/app/dashboard/(book)/shared';

// Generate dummy data
const DUMMY_USERS: UserType[] = [
  { id: "admin-1", name: "Admin Teacher", email: "admin@school.demo", role: true, attending: true, hasGuest: false, tableId: 1 },
  { id: "student-1", name: "John Doe", email: "john@student.demo", role: false, attending: true, hasGuest: true, tableId: 1 },
  { id: "student-2", name: "Jane Smith", email: "jane@student.demo", role: false, attending: true, hasGuest: false, tableId: 2 },
  { id: "student-3", name: "Alice Johnson", email: "alice@student.demo", role: false, attending: true, hasGuest: true, tableId: 3 },
  { id: "student-4", name: "Bob Williams", email: "bob@student.demo", role: false, attending: false, hasGuest: false, tableId: undefined },
];

export const usersAtom = atomWithStorage<UserType[]>('demo-users', DUMMY_USERS);
export const currentUserIdAtom = atomWithStorage<string | null>('demo-current-user-id', null);

export const currentUserAtom = atom(
  (get) => {
    const users = get(usersAtom);
    const currentId = get(currentUserIdAtom);
    return users.find(u => u.id === currentId) || null;
  }
);
