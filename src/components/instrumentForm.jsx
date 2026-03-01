import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInstrument, updateInstrument, clearStatuses } from '../features/instruments/instrumentsSlice';

const InstrumentForm = ({ instrument, onClose }) => {
    const dispatch = useDispatch();
    const { createStatus, updateStatus, error } = useSelector(state => state.instruments);
    
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        price: ''
    });

    // Если передан instrument для редактирования, заполняем форму
    useEffect(() => {
        if (instrument) {
            setFormData({
                name: instrument.name || '',
                type: instrument.type || '',
                description: instrument.description || '',
                price: instrument.price || ''
            });
        }
    }, [instrument]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const instrumentData = {
            ...formData,
            price: Number(formData.price)
        };

        if (instrument) {
            // Редактирование
            await dispatch(updateInstrument({ 
                id: instrument.id, 
                data: instrumentData 
            }));
        } else {
            // Создание
            await dispatch(createInstrument(instrumentData));
        }
        
        dispatch(clearStatuses());
        onClose?.();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{instrument ? 'Редактировать' : 'Добавить'} инструмент</h2>
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Название:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Тип:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Описание:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={styles.textarea}
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Цена ($):</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            style={styles.input}
                        />
                    </div>

                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.buttons}>
                        <button 
                            type="submit"
                            disabled={createStatus === 'loading' || updateStatus === 'loading'}
                            style={styles.submit}
                        >
                            {createStatus === 'loading' || updateStatus === 'loading' 
                                ? 'Сохранение...' 
                                : 'Сохранить'}
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose}
                            style={styles.cancel}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        background: 'white',
        padding: 30,
        borderRadius: 8,
        width: '90%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflowY: 'auto'
    },
    field: {
        marginBottom: 15
    },
    input: {
        width: '100%',
        padding: 8,
        marginTop: 5,
        border: '1px solid #ddd',
        borderRadius: 4
    },
    textarea: {
        width: '100%',
        padding: 8,
        marginTop: 5,
        border: '1px solid #ddd',
        borderRadius: 4,
        minHeight: 80
    },
    buttons: {
        display: 'flex',
        gap: 10,
        marginTop: 20
    },
    submit: {
        flex: 1,
        padding: 10,
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer'
    },
    cancel: {
        flex: 1,
        padding: 10,
        background: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: 10,
        padding: 10,
        background: '#ffebee',
        borderRadius: 4
    }
};

export default InstrumentForm;

