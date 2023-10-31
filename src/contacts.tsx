import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export interface Contact {
  id: string;
  first: string;
  last: string;
  createdAt: number;
  favorite?: boolean;
  avatar?: string;
  twitter?: string;
  notes?: string;
}

export async function getContacts(query?: string | undefined): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] | null = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function getContact(id: string): Promise<Contact> {
  await fakeNetwork(`getContact:${id}`);
  const contacts: Contact[] = await getContacts(undefined);
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error("Contact not found");
  return contact;
}

export async function createContact(): Promise<Contact> {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const contact: Contact = { id, createdAt: Date.now(), first: "", last: "" };
  const contacts: Contact[] = await getContacts(undefined);
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

async function set(contacts: Contact[]): Promise<void> {
  await localforage.setItem("contacts", contacts);
}

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }

  if (key && fakeCache[key]) {
    return;
  }
  if (key) {
    fakeCache[key] = true;
  }
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

let fakeCache: { [key: string]: boolean } = {};
