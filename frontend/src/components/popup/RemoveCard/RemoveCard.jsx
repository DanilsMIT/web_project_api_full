export default function RemoveCard(propiedades) {
  const { CardData, handleDeleteClick } = propiedades;
  return (
    <button
      className="button popup__button"
      type="button"
      onClick={() => handleDeleteClick(CardData)}
    >
      Si
    </button>
  );
}
