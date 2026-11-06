export default function Toast({ toast }) {
  return (
    <div className="toast-message" id="toast-message" role="status" aria-live="polite" hidden={!toast}>
      {toast && <span key={toast.id}>{toast.message}</span>}
    </div>
  );
}
