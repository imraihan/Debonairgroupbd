import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://59.152.62.177:8085/api';

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (body) => {
  const response = await axios.get(`${API_URL}/Employee/EmployeeData`);
  return response.data;
});

export const saveEmployee = createAsyncThunk('user/saveEmployee', async (employeeData) => {
  const response = await axios.post(`${API_URL}/Employee/SaveEmployeeInformation`, employeeData);
  return response.data;
});

export const fetchEmployeeDetailsData = createAsyncThunk('user/fetchEmployeeDetailsData', async (empId) => {
  const response = await axios.get(`${API_URL}/Employee/IndividualEmployeeData/${empId}`);
  return response.data;
});

export const updateEmployee = createAsyncThunk(
  'user/updateEmployee',
  async ({ empId, employeeData }) => {
    const response = await axios.put(
      `${API_URL}/Employee/UpdateEmployeeInformation/${empId}`,
      employeeData
    );
    return response.data;
  }
);


const initialState = {
  users: [],
  loading: false,
  error: null,
  isSuccess: false,
  message: '',
  selectedTab: '',
  employeeDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      return { ...state, users: [], isSuccess: false, message: '' };
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isSuccess = true;
        // console.log('Fulfilled State:', state);
        state.message = 'User data retrieved successfully.';
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
        state.message = 'Failed to retrieve user data.';
      })
      .addCase(saveEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(saveEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.users =action.payload; 
        state.isSuccess = true;
        state.message = 'Employee saved successfully.';
      })
      .addCase(saveEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
        state.message = 'Failed to save employee.';
      })
      builder
      .addCase(fetchEmployeeDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeDetails = action.payload;
        state.isSuccess = true;
        state.message = 'Employee details retrieved successfully.';
      })
      .addCase(fetchEmployeeDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

       // Add the case for updating the employee
       .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
        state.message = '';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        // Update the employee details in the state
        state.users = state.users.map((user) => {
          if (user.empId === action.payload.empId) {
            return action.payload;
          }
          return user;
        });
        state.isSuccess = true;
        state.message = 'Employee updated successfully.';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
        state.message = 'Failed to update employee.';
      });

  },
});

export const { resetUser, setSelectedTab } = userSlice.actions;

export default userSlice.reducer;
