import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    birthday: string;
    nationality: string;
    citizenId: string;
    gender: string;
    mobilePhone: string;
    passportNo?: string;
    expectedSalary: string;
}

interface FormState {
    data: PersonalInfo[];
    selectedPerson: PersonalInfo | null;
    selectedRowKeys: React.Key[]; 

}

const initialState: FormState = {
    data: typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("personalInfo") || "[]")
        : [],
    selectedPerson: null,
    selectedRowKeys: [],
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addInfo: (state, action: PayloadAction<PersonalInfo>) => {
            state.data.push(action.payload);
            localStorage.setItem("personalInfo", JSON.stringify(state.data));
        },
        deleteInfo: (state, action: PayloadAction<React.Key[]>) => {
            const idsToDelete = action.payload; 
            state.data = state.data.filter((item) => !idsToDelete.includes(item.id)); 
            localStorage.setItem("personalInfo", JSON.stringify(state.data));
        },

        updateInfo: (state, action: PayloadAction<PersonalInfo>) => {
            const updatedData = state.data.map((person) =>
                person.id === action.payload.id ? action.payload : person
            );
            state.data = updatedData;
            localStorage.setItem("personalInfo", JSON.stringify(state.data)); 
        },
        setSelectedPerson: (state, action: PayloadAction<PersonalInfo | null>) => {
            state.selectedPerson = action.payload;
        },
        setSelectedRowKeys: (state, action: PayloadAction<React.Key[]>) => {
            state.selectedRowKeys = action.payload; 
        },
    },
});

export const { addInfo, deleteInfo, updateInfo, setSelectedPerson, setSelectedRowKeys } = formSlice.actions;
export default formSlice.reducer;
