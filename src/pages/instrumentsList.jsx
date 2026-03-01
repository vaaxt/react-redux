import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstruments } from "../features/instruments/instrumentsSlice";
import { useNavigate } from "react-router-dom";
import InstrumentForm from "../components/instrumentForm";

const InstrumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error, deleteStatus } = useSelector(state => state.instruments);
  const [showForm, setShowForm] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState(null);

  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Удалить этот инструмент?')) {
      await dispatch(deleteInstrument(id));
    }
  };

  const handleEdit = (instrument, e) => {
    e.stopPropagation();
    setEditingInstrument(instrument);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingInstrument(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingInstrument(null);
  };

  if (status === "loading") return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <h2>Музыкальные инструменты</h2>
        <button onClick={handleAdd} style={styles.addButton}>

          ➕ Добавить инструмент
        </button>
      </div>

      {deleteStatus === 'loading' && <p>Удаление...</p>}

      <ul style={styles.list}>
        {items.map(inst => (
          <li key={inst.id} style={styles.item}>
            <div 
              style={styles.itemContent}
              onClick={() => navigate(`/instruments/${inst.id}`)}
            >
              <div>
                <strong>{inst.name}</strong> - {inst.type} (${inst.price})
                <p style={styles.description}>{inst.description}</p>
              </div>
              <div style={styles.actions}>
                <button 
                  onClick={(e) => handleEdit(inst, e)}
                  style={styles.editButton}
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => handleDelete(inst.id, e)}
                  style={styles.deleteButton}
                  disabled={deleteStatus === 'loading'}
                >
                  🗑️
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <InstrumentForm 
          instrument={editingInstrument}
          onClose={handleCloseForm}
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
  addButton: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    marginBottom: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
    padding: 10
  },
  itemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  description: {
    margin: '5px 0',
    color: '#666'
  },
  actions: {
    display: 'flex',
    gap: 5
  },
  editButton: {
    padding: '5px 10px',
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '5px 10px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  }
};

export default InstrumentsList;