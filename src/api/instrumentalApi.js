const instruments = [
    {
        id: 1,
        name: "Гитара",
        type: "Струнный",
        description: "Популярный муз инструмент",
        price: 300
    },
    {
        id:2,
        name: "Фортепиано",
        type: "Клавишный",
        description: "Популярный",
        price: 1200
    }
];

// имитация задержки

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//получить инстументы
export const fetchInstrumentalApi = async ()=> {
    await delay(500);
    return instruments;
}

// Получить инструменты по id
export const fetchInstrumentalByIdApi = async(id) =>{
    await delay(300);
    return instruments.find(inst=>inst.id=== Number(id));
}