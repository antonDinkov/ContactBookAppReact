export interface Contact {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
}

export type ContactDraft = Omit<Contact, 'id'>
