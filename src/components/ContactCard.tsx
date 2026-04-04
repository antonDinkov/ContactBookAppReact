import type { Contact } from '../types/contact'

interface ContactCardProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <article className="contact-card">
      <h3>{contact.fullName}</h3>
      <div className="contact-divider" />

      <dl className="contact-details">
        <div>
          <dt>Email:</dt>
          <dd>{contact.email}</dd>
        </div>
        <div>
          <dt>Phone:</dt>
          <dd>{contact.phone}</dd>
        </div>
        <div>
          <dt>Address:</dt>
          <dd>{contact.address}</dd>
        </div>
      </dl>

      <div className="card-actions">
        <button type="button" className="btn btn-edit" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button type="button" className="btn btn-delete" onClick={() => onDelete(contact)}>
          Delete
        </button>
      </div>
    </article>
  )
}
