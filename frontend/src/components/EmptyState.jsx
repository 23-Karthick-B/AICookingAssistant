import { Link } from "react-router-dom";

export default function EmptyState({ icon = "📋", title, message, actionText, actionLink }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="empty-state-btn">
          {actionText}
        </Link>
      )}
    </div>
  );
}
