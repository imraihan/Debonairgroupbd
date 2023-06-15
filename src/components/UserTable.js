import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsers, fetchEmployeeDetailsData } from '../features/user/userSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const UserTable = ({ tableHeader }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users.readEmployeeData);
  const selectedTab = useSelector((state) => state.user.selectedTab);
  const [searchText, setSearchText] = useState('');

 useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const filteredUsers = users && users.length > 0
    ? users.filter((user) =>
        (selectedTab === 0 && user.employeeType === 'Admin') ||
        (selectedTab === 1 && user.employeeType === 'Employee')
      )
    : [];

  const handleDetailsClick = (empId) => {
    dispatch(fetchEmployeeDetailsData(empId));
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const searchResults = filteredUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{tableHeader}</h2>
      <TextField
        label="Search by Name"
        value={searchText}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Employee Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.length > 0 ? (
              searchResults.map(({ empID, firstName, lastName, employeeType }) => (
                <TableRow key={empID}>
                  <TableCell>{empID}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell>{employeeType}</TableCell>
                  <TableCell>
                    <Link
                      to={`/details-page/${empID}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleDetailsClick(empID)}
                      >
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  No {selectedTab === 0 ? 'Admin' : 'Employee'} available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;




