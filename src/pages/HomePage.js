import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Button } from '@mui/material';
import UserTable from '../components/UserTable';
import AddUser from '../components/AddUser';
import { setSelectedTab, fetchAllUsers } from '../features/user/userSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.user.selectedTab);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const renderTable = () => {
    const tableHeader = selectedTab === 0 ? 'Admin List' : 'Employee List';

    return <UserTable tableHeader={tableHeader} />;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Tabs value={selectedTab !== '' ? selectedTab : -1} onChange={handleTabChange} >
          <Tab label="Home" value={-1}/>
          <Tab label="Admin" value={0}/>
          <Tab label="User" value={1}/>
        </Tabs>
        <Button variant="contained" onClick={handleModalOpen}>
          Add User
        </Button>
      </div>
      {renderTable()}
      <AddUser open={openModal} onClose={handleModalClose} />
    </div>
  );
};

export default HomePage;





