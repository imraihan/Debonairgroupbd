import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDivisions, fetchDistricts } from '../api/api';
import { saveEmployee } from '../features/user/userSlice';
import { fetchAllUsers } from '../features/user/userSlice';
import ModalComponent from './ModalComponent';
import UserForm from './UserForm';

const AddUser = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    employeeType: '',
    districtID: 0,
  });

  const [divisionOptions, setDivisionOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');

  useEffect(() => {
    fetchDivisions()
      .then((response) => {
        setDivisionOptions(response);
      })
      .catch((error) => {
        console.log('Error fetching divisions:', error);
      });
  }, []);

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    const selectedDivision = divisionOptions.find(
      (division) => division.divID === divisionId
    );

    setUserData((prevState) => ({
      ...prevState,
      districtID: 0,
      divisionId: divisionId,
      selectedDivision: divisionId,
    }));

    setSelectedDivision(selectedDivision.divID);

    fetchDistricts(divisionId)
      .then((response) => {
        setDistrictOptions(response);
      })
      .catch((error) => {
        console.log('Error fetching districts:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'employeeType') {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
        districtID: 0,
        divisionId: 0,
        selectedDivision: '',
      }));
    } else if (name === 'division') {
      setUserData((prevState) => ({
        ...prevState,
        divisionId: value,
        selectedDivision: value,
        districtID: 0,
      }));
    } else if (name === 'district') {
      const districtID = value === '' ? 0 : value;
      setUserData((prevState) => ({
        ...prevState,
        districtID: districtID,
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, employeeType, districtID } = userData;

    const employeeData = {
      firstName,
      lastName,
      employeeType,
      districeID: districtID,
    };

    dispatch(saveEmployee(employeeData))
      .then(() => {
        setUserData({
          firstName: '',
          lastName: '',
          employeeType: '',
          districtID: 0,
        });
        setSelectedDivision('');
        setDistrictOptions([]);
        onClose();
        dispatch(fetchAllUsers());
      })
      .catch((error) => {
        console.log('Error saving employee:', error);
      });
  };

  return (
    <ModalComponent open={open} onClose={onClose} title="Add Employee">
      <UserForm
        userData={userData}
        divisionOptions={divisionOptions}
        districtOptions={districtOptions}
        selectedDivision={selectedDivision}
        handleDivisionChange={handleDivisionChange}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
    </ModalComponent>
  );
};

export default AddUser;
