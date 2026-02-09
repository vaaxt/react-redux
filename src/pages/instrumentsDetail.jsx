import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInstrumentById, clearSelectedInstrument } from "../features/instruments/instrumentsSlice";

const InstrumentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedInstrument, status } = useSelector(state => state.instruments);

  useEffect(() => {
    dispatch(fetchInstrumentById(id));
  }, [dispatch, id]);

  if (status === "loading") return <p>Загрузка инструмента...</p>;
  if (!selectedInstrument) return null;

  return (
    <div className="container">
      <button
        onClick={() => {
          dispatch(clearSelectedInstrument());
          navigate("/");
        }}
      >
        ← Назад
      </button>

      <h2>{selectedInstrument.name}</h2>
      <p><b>Тип:</b> {selectedInstrument.type}</p>
      <p><b>Описание:</b> {selectedInstrument.description}</p>
      <p><b>Цена:</b> ${selectedInstrument.price}</p>
    </div>
  );
};

export default InstrumentDetail;

