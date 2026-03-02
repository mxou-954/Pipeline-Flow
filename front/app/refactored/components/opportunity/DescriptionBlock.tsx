import { Edit3, Save, X } from "lucide-react";

type Props = {
  description?: string;
  isEditing: boolean;
  editedDesc: string;
  isSaving: boolean;
  busy: boolean;
  loading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
};

export default function DescriptionBlock({
  description,
  isEditing,
  editedDesc,
  isSaving,
  busy,
  loading,
  onEdit,
  onSave,
  onCancel,
  onChange,
}: Props) {
  if (isEditing) {
    return (
      <div className="space-y-3 relative z-50">
        <textarea
          value={editedDesc}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[120px] p-4 bg-gray-900 border-2 border-purple-500 rounded-xl text-gray-200 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-400 resize-y"
          placeholder="Ajouter une description..."
          autoFocus
          style={{ pointerEvents: "auto" }}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ pointerEvents: "auto" }}
          >
            <Save size={16} />
            {isSaving ? "Sauvegarde..." : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg transition-all"
            style={{ pointerEvents: "auto" }}
          >
            <X size={16} />
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
        {description ? (
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        ) : (
          <p className="text-gray-600 text-sm italic">
            Aucune description disponible.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onEdit}
        disabled={busy || loading}
        className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <Edit3 size={16} />
      </button>
    </div>
  );
}