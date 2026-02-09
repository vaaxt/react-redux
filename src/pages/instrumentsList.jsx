import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstruments } from "../features/instruments/instrumentsSlice";
import { useNavigate } from "react-router-dom";

const InstrumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector(state => state.instruments);

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container">
      <h2>Музыкальные инструменты</h2>
      <ul>
        {items.map(inst => (
          <li key={inst.id}>
            <button onClick={() => navigate(`/instruments/${inst.id}`)}>
              {inst.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstrumentsList;