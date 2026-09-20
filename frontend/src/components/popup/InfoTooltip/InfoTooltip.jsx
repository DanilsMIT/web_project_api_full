import sucess from "../../../images/sucess.svg";
import wrong from "../../../images/wrong.svg";

export default function InfoTooltip({ isSuccess, message }) {
  return (
    <div className="tooltip">
      <img
        className="tooltip__icon"
        src={isSuccess ? sucess : wrong}
        alt={isSuccess ? "Éxito" : "Error"}
      />
      <h2 className="tooltip__title">{message}</h2>
    </div>
  );
}
