export default function ImagePopup(propiedades) {
  const { CardData } = propiedades;

  return (
    <>
      <img alt={CardData.name} className="popup__image" src={CardData.link} />
      <p className="popup__caption">{CardData.name}</p>
    </>
  );
}
