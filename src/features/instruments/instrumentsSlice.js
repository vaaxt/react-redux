import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstrumentsApi, fetchInstrumentByIdApi } from "../../api/instrumentsApi";

// 📃 Загрузка списка
export const fetchInstruments = createAsyncThunk(
    "instruments/fetchAll",
    async () => {
        return await fetchInstrumentsApi();
    }
);

// 🔍 Загрузка одного инструмента
export const fetchInstrumentById = createAsyncThunk(
    "instruments/fetchById",
    async (id) => {
        return await fetchInstrumentByIdApi(id);
    }
);

// ➕ СОЗДАНИЕ
export const createInstrument = createAsyncThunk(
    "instruments/create",
    async (instrumentData) => {
        return await createInstrumentApi(instrumentData);
    }
);

// ✏️ ОБНОВЛЕНИЕ
export const updateInstrument = createAsyncThunk(
    "instruments/update",
    async ({ id, data }) => {
        return await updateInstrumentApi(id, data);
    }
);

// 🗑️ УДАЛЕНИЕ
export const deleteInstrument = createAsyncThunk(
    "instruments/delete",
    async (id) => {
        await deleteInstrumentApi(id);
        return id; // возвращаем id удаленного элемента
    }
);



const instrumentsSlice = createSlice({
    name: "instruments",
    initialState: {
        items: [],
        selectedInstrument: null,
        status: "idle",
        error: null
    },
    reducers: {
        clearSelectedInstrument(state) {
            state.selectedInstrument = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // список
            .addCase(fetchInstruments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstruments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchInstruments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // один инструмент
            .addCase(fetchInstrumentById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstrumentById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedInstrument = action.payload;
            })
            .addCase(fetchInstrumentById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            // ➕ CREATE
            .addCase(createInstrument.pending, (state) => {
                state.createStatus = "loading";
            })
            .addCase(createInstrument.fulfilled, (state, action) => {
                state.createStatus = "succeeded";
                state.items.push(action.payload); // добавляем новый инструмент в список
            })
            .addCase(createInstrument.rejected, (state, action) => {
                state.createStatus = "failed";
                state.error = action.error.message;
            })

            // ✏️ UPDATE
            .addCase(updateInstrument.pending, (state) => {
                state.updateStatus = "loading";
            })
            .addCase(updateInstrument.fulfilled, (state, action) => {
                state.updateStatus = "succeeded";
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload; // обновляем в списке
                }
                if (state.selectedInstrument?.id === action.payload.id) {
                    state.selectedInstrument = action.payload; // обновляем выбранный
                }
            })
            .addCase(updateInstrument.rejected, (state, action) => {
                state.updateStatus = "failed";
                state.error = action.error.message;
            })

            // 🗑️ DELETE
            .addCase(deleteInstrument.pending, (state) => {
                state.deleteStatus = "loading";
            })
            .addCase(deleteInstrument.fulfilled, (state, action) => {
                state.deleteStatus = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload); // удаляем из списка
                if (state.selectedInstrument?.id === action.payload) {
                    state.selectedInstrument = null; // очищаем выбранный
                }
            })
            .addCase(deleteInstrument.rejected, (state, action) => {
                state.deleteStatus = "failed";
                state.error = action.error.message;
            });
    }
});

            

export const { clearSelectedInstrument, clearStatuses } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;



