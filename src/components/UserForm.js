import React from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const UserForm = ({
  userData,
  divisionOptions = [],
  districtOptions = [],
  selectedDivision,
  handleDivisionChange,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        name="firstName"
        label="First Name"
        value={userData.firstName}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={userData.lastName}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        select
        name="employeeType"
        label="Employee Type"
        value={userData.employeeType}
        onChange={handleInputChange}
        fullWidth
        required
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Employee">Employee</MenuItem>
      </TextField>
      {userData.employeeType === 'Employee' && (
        <>
          <TextField
            select
            name="divisionId"
            label="Division"
            value={userData.divisionId || ""}
            onChange={handleDivisionChange}
            fullWidth
            required
          >
            <MenuItem value="">Select Division</MenuItem>
            {divisionOptions.map((division) => (
              <MenuItem key={division.divID} value={division.divID}>
                {division.divisionName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            name="district"
            label="District"
            value={userData.districtID}
            onChange={handleInputChange}
            fullWidth
            required
          >
            <MenuItem key={0} value={0}>
              Select District
            </MenuItem>
            {districtOptions.map((district) => (
              <MenuItem key={district.districtID} value={district.districtID}>
                {district.districtName}
              </MenuItem>
            ))}
          </TextField>
        </>
      )}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </form>
  );
};

export default UserForm;



