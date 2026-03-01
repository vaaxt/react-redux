// имитация задержки

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// получить инструменты
export const fetchInstrumentsApi = async () => {
    await delay(500);
    

    const response = await fetch('./src/public/instruments.json');
    const data = await response.json();
    return data.instruments; 
}


// Получить инструмент по id
export const fetchInstrumentByIdApi = async (id) => {
    await delay(300);
    

    const response = await fetch('/src/public/instruments.json');
    const data = await response.json();
    return data.instruments.find(inst => inst.id === Number(id));
}



export const createInstrumentApi = async (instrument) => {
    await delay(500);
    
    // В реальном проекте тут был бы POST запрос
    // Но так как у нас JSON файл, просто имитируем создание
    const response = await fetch('/instruments.json');
    const data = await response.json();
    
    const newId = Math.max(...data.instruments.map(i => i.id), 0) + 1;
    const newInstrument = { ...instrument, id: newId };
    
    console.log('✅ Создан инструмент:', newInstrument);
    return newInstrument;
}

// ✏️ ОБНОВИТЬ (UPDATE)
export const updateInstrumentApi = async (id, updatedData) => {
    await delay(500);
    
    const response = await fetch('/instruments.json');
    const data = await response.json();
    
    const updatedInstrument = { ...updatedData, id: Number(id) };
    console.log(`✅ Обновлен инструмент ${id}:`, updatedInstrument);
    return updatedInstrument;
}

// 🗑️ УДАЛИТЬ (DELETE)
export const deleteInstrumentApi = async (id) => {
    await delay(400);
    
    console.log(`✅ Удален инструмент с ID ${id}`);
    return { id, success: true };
}







