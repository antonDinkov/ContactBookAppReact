import { useEffect, useState } from 'react'
import type { Contact, ContactDraft } from '../types/contact'

interface AddEditContactDialogProps {
  isOpen: boolean
  contact: Contact | null
  onClose: () => void
  onSave: (draft: ContactDraft) => void
}

const emptyDraft: ContactDraft = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
}

export function AddEditContactDialog({
  isOpen,
  contact,
  onClose,
  onSave,
}: AddEditContactDialogProps) {
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (contact) {
      setDraft({
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      })
      return
    }

    setDraft(emptyDraft)
  }, [contact, isOpen])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave({
      fullName: draft.fullName.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      address: draft.address.trim(),
    })
  }

  const dialogTitle = contact ? 'Edit Contact' : 'Add Contact'

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-edit-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="add-edit-title">{dialogTitle}</h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              value={draft.fullName}
              onChange={(event) => setDraft({ ...draft, fullName: event.target.value })}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={draft.email}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              value={draft.phone}
              onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
              required
            />
          </label>

          <label>
            Address
            <textarea
              rows={3}
              value={draft.address}
              onChange={(event) => setDraft({ ...draft, address: event.target.value })}
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
