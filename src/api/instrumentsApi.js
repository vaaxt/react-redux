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



