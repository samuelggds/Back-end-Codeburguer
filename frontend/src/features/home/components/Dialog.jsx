import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

/** The native modal supplies focus trapping, Escape, and focus restoration. */
export default function Dialog({ id, titleId, title, open, onClose, closeLabel = 'Fechar', children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }

  return (
    <dialog
      id={id}
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={handleBackdropClick}
    >
      <div className="dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button className="close-dialog" type="button" data-close aria-label={closeLabel} onClick={onClose}><Icon name="close" /></button>
      </div>
      {children}
    </dialog>
  );
}
