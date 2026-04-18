import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchInstrumentById, clearSelectedInstrument, toggleLike, toggleFavorite, addRating, selectAverageRating, deleteInstrument } from "../features/instruments/instrumentsSlice";
import InstrumentForm from "../components/instrumentForm";

const InstrumentDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedInstrument, status } = useSelector(state => state.instruments);
  const averageRating = useSelector(state => selectAverageRating(state, id));
  const [showEditForm, setShowEditForm] = useState(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    dispatch(fetchInstrumentById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Удалить этот инструмент?')) {
      await dispatch(deleteInstrument(id));
      navigate('/');
    }
  };

  const handleToggleLike = () => {
    dispatch(toggleLike(id));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  const handleAddRating = () => {
    dispatch(addRating({ id, rating: parseInt(rating) }));
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
        <p><b>Средняя оценка:</b> {averageRating.toFixed(1)} ⭐</p>
        
        <div style={styles.interactions}>
          <button onClick={handleToggleLike} style={selectedInstrument.likes ? styles.likedButton : styles.likeButton}>
            {selectedInstrument.likes ? '❤️ Лайкнуто' : '🤍 Лайк'}
          </button>
          <button onClick={handleToggleFavorite} style={selectedInstrument.isFavorite ? styles.favoritedButton : styles.favoriteButton}>
            {selectedInstrument.isFavorite ? '⭐ В избранном' : '☆ Добавить в избранное'}
          </button>
        </div>
        
        <div style={styles.ratingSection}>
          <label>Оценить: </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={handleAddRating} style={styles.rateButton}>Оценить</button>
        </div>
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
  },
  interactions: {
    display: 'flex',
    gap: 10,
    marginTop: 10
  },
  likeButton: {
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer'
  },
  likedButton: {
    padding: '8px 16px',
    background: '#ffcccc',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer'
  },
  favoriteButton: {
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer'
  },
  favoritedButton: {
    padding: '8px 16px',
    background: '#ffffcc',
    border: '1px solid #ccc',
    borderRadius: 4,
    cursor: 'pointer'
  },
  ratingSection: {
    marginTop: 10
  },
  rateButton: {
    padding: '8px 16px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginLeft: 10
  }
};

export default InstrumentDetail;

