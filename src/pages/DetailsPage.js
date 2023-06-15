import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Button, Typography ,Toolbar} from '@mui/material';
import ModalComponent from '../components/ModalComponent';
import UserForm from '../components/UserForm';


const DetailsPage = () => {
  const userDetails = useSelector((state) => state.user.employeeDetails);
  // const { empId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  const renderUserDetails = () => {
    if (userDetails && userDetails.readEmployeeData && userDetails.readEmployeeData.length > 0) {
      const { firstName, lastName, employeeType, district } = userDetails.readEmployeeData[0];

      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card>
            <CardHeader title="User Details" />
            <CardContent>
              <Typography variant="body1">
                <strong>First Name:</strong> {firstName}
              </Typography>
              <Typography variant="body1">
                <strong>Last Name:</strong> {lastName}
              </Typography>
              <Typography variant="body1">
                <strong>Employee Type:</strong> {employeeType}
              </Typography>
              <Typography variant="body1">
                <strong>District:</strong> {district}
              </Typography>
              {/* Add additional user details here */}
            </CardContent>
            <Toolbar>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Edit
                </Button>
                <Button variant="contained" color="primary" onClick={handleGoBack}>
                  Back
                </Button>
              </Toolbar>
            </Card>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderUserDetails()}
      {userDetails && userDetails.readEmployeeData && userDetails.readEmployeeData.length > 0 && (
        <ModalComponent open={openModal} onClose={handleCloseModal} title="Edit Employee">
          <UserForm userData={userDetails.readEmployeeData[0]} onClose={handleCloseModal} />
        </ModalComponent>
      )}
    </div>
  );
};

export default DetailsPage;