import { useEffect, useMemo, useState } from 'react'
import { sampleContacts } from '../data/sampleContacts'
import type { Contact, ContactDraft } from '../types/contact'
import { AddEditContactDialog } from './AddEditContactDialog'
import { ContactCard } from './ContactCard'
import { DeleteContactConfirmDialog } from './DeleteContactConfirmDialog'

const STORAGE_KEY = 'contact-book-contacts'

function getInitialContacts(): Contact[] {
  const savedValue = localStorage.getItem(STORAGE_KEY)
  if (!savedValue) {
    return sampleContacts
  }

  try {
    const parsedContacts = JSON.parse(savedValue) as Contact[]
    if (Array.isArray(parsedContacts)) {
      return parsedContacts
    }
  } catch {
    return sampleContacts
  }

  return sampleContacts
}

function createContactId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `contact-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`
}

export function ContactsEditor() {
  const [contacts, setContacts] = useState<Contact[]>(() => getInitialContacts())
  const [searchQuery, setSearchQuery] = useState('')
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return contacts
    }

    return contacts.filter((contact) => {
      const haystack = `${contact.fullName} ${contact.email} ${contact.phone} ${contact.address}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [contacts, searchQuery])

  const openAddDialog = () => {
    setEditingContact(null)
    setIsAddEditOpen(true)
  }

  const openEditDialog = (contact: Contact) => {
    setEditingContact(contact)
    setIsAddEditOpen(true)
  }

  const closeAddEditDialog = () => {
    setEditingContact(null)
    setIsAddEditOpen(false)
  }

  const handleSave = (draft: ContactDraft) => {
    if (editingContact) {
      setContacts((current) =>
        current.map((contact) =>
          contact.id === editingContact.id ? { ...contact, ...draft } : contact,
        ),
      )
    } else {
      setContacts((current) => [{ id: createContactId(), ...draft }, ...current])
    }

    closeAddEditDialog()
  }

  const handleDeleteConfirm = (contactId: string) => {
    setContacts((current) => current.filter((contact) => contact.id !== contactId))
    setDeletingContact(null)
  }

  return (
    <section className="contacts-editor" aria-label="Contacts editor">
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name, email, phone or address"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          aria-label="Search contacts"
        />
        <button type="button" className="btn btn-add" onClick={openAddDialog}>
          Add Contact
        </button>
      </div>

      {filteredContacts.length > 0 ? (
        <div className="contacts-grid">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={openEditDialog}
              onDelete={setDeletingContact}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">No contacts found for this filter.</p>
      )}

      <AddEditContactDialog
        isOpen={isAddEditOpen}
        contact={editingContact}
        onClose={closeAddEditDialog}
        onSave={handleSave}
      />

      <DeleteContactConfirmDialog
        isOpen={Boolean(deletingContact)}
        contact={deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  )
}
