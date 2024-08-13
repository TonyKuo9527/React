import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 確保正確導入 storage

// 初始狀態
const initialState = {
    rowData: [
        { id: 1, field1: "Toyota", field2: "Celica", field3: 35000, field4: 1 },
        { id: 2, field1: "Ford", field2: "Mondeo", field3: 32000, field4: 1 },
        { id: 3, field1: "Porsche", field2: "Boxster", field3: 72000, field4: 1 }
    ]  // 預設的 rowData
};

// Action types
const SET_ROW_DATA = 'SET_ROW_DATA';

// Action creators
export const setRowData = (data) => ({
    type: SET_ROW_DATA,
    payload: data
});

// Reducer
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROW_DATA:
            return {
                ...state,
                rowData: action.payload
            };
        default:
            return state;
    }
}

// Redux Persist 配置
const persistConfig = {
    key: 'root',
    storage,  // 使用 localStorage 作為存儲
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 創建 store
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };