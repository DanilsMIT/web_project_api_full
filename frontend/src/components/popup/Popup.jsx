import { useEffect } from "react";

function Popup(propiedades) {
  //atributos
  const { onClose, title, children } = propiedades;
  let popupContentClass = "popup__content";

  if (title == "Cambiar Avatar" || title == "¿Borrar elemento?") {
    popupContentClass += " popup__content_type-small";
  } else if (!title) {
    popupContentClass += " popup__content_content_image";
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      <div className="popup" onClick={onClose}>
        <div className={popupContentClass} onClick={(e) => e.stopPropagation()}>
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          {title && <h3 className="popup__title">{title}</h3>}
          {children}
        </div>
      </div>
    </>
  );
}

export default Popup;
