import type { Contact } from '../types/contact'

interface DeleteContactConfirmDialogProps {
  isOpen: boolean
  contact: Contact | null
  onClose: () => void
  onConfirm: (contactId: string) => void
}

export function DeleteContactConfirmDialog({
  isOpen,
  contact,
  onClose,
  onConfirm,
}: DeleteContactConfirmDialogProps) {
  if (!isOpen || !contact) {
    return null
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal modal-confirm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-contact-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="delete-contact-title">Delete Contact</h2>
        <p>
          Are you sure you want to delete <strong>{contact.fullName}</strong>?
        </p>

        <div className="modal-actions">
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-delete"
            onClick={() => onConfirm(contact.id)}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  )
}
