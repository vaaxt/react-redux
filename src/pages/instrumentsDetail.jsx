import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInstrumentById, clearSelectedInstrument } from "../features/instruments/instrumentsSlice";
import InstrumentForm from "../components/instrumentForm";

const InstrumentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedInstrument, status } = useSelector(state => state.instruments);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(fetchInstrumentById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Удалить этот инструмент?')) {
      await dispatch(deleteInstrument(id));
      navigate('/');
    }
  };

  if (status === "loading") return <p>Загрузка инструмента...</p>;
  if (!selectedInstrument) return null;

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <button
          onClick={() => {
            dispatch(clearSelectedInstrument());
            navigate("/");
          }}
          style={styles.backButton}
        >
          ← Назад
        </button>
        
        <div style={styles.actions}>
          <button 
            onClick={() => setShowEditForm(true)}
            style={styles.editButton}
          >
            ✏️ Редактировать
          </button>
          <button 
            onClick={handleDelete}
            style={styles.deleteButton}
          >
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <h2>{selectedInstrument.name}</h2>
        <p><b>Тип:</b> {selectedInstrument.type}</p>
        <p><b>Описание:</b> {selectedInstrument.description}</p>
        <p><b>Цена:</b> ${selectedInstrument.price}</p>
      </div>

      {showEditForm && (
        <InstrumentForm 
          instrument={selectedInstrument}
          onClose={() => {
            setShowEditForm(false);
            dispatch(fetchInstrumentById(id)); // перезагружаем данные
          }}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 20
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  backButton: {
    padding: '10px 20px',
    background: '#666',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  actions: {
    display: 'flex',
    gap: 10
  },
  editButton: {
    padding: '10px 20px',
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '10px 20px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  content: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 20
  }
};

export default InstrumentDetail;

