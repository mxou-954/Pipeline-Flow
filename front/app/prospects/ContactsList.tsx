import { User, Mail, Linkedin } from "lucide-react";
import type { ProspectContact } from "../refactored/types";

type Props = {
  contacts: ProspectContact[];
};

export default function ContactsList({ contacts }: Props) {
  if (contacts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <User size={16} />
        Contacts ({contacts.length})
      </div>
      <div className="space-y-2">
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-900/30 border border-gray-800 rounded-xl space-y-2"
          >
            <div className="font-semibold text-gray-200">{contact.name}</div>
            <div className="flex flex-wrap gap-2">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 text-xs transition-all"
                >
                  <Mail size={14} />
                  {contact.email}
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg text-blue-400 text-xs transition-all"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}