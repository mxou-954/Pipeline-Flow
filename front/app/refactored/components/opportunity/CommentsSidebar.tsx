import { forwardRef } from "react";
import type { Comment } from "../../types";

type Props = {
  comments: Comment[];
};

const CommentsSidebar = forwardRef<HTMLDivElement, Props>(
  ({ comments }, ref) => {
    return (
      <aside
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-y-auto min-h-[20vh]"
      >
        <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
          Historique
        </h3>

        {comments.length === 0 && (
          <p className="text-xs text-gray-500">Aucun commentaire</p>
        )}

        {comments.map((c) => (
          <div
            key={c.id}
            className="mb-4 border-b border-gray-800 pb-3 last:border-b-0"
          >
            <div className="text-xs text-gray-400 mb-1">
              {c.user
                ? `${c.user.firstname} ${c.user.lastname}`
                : "Système"}{" "}
              • {new Date(c.createdAt).toLocaleString()}
            </div>

            {c.content && (
              <div className="text-sm text-gray-200 whitespace-pre-wrap">
                {c.content}
              </div>
            )}
          </div>
        ))}
      </aside>
    );
  },
);

CommentsSidebar.displayName = "CommentsSidebar";

export default CommentsSidebar;