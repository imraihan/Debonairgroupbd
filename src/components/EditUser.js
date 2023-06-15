import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDistricts, fetchDivisions } from "../api/api";
import { updateEmployee } from "../features/user/userSlice";
import { fetchAllUsers } from "../features/user/userSlice";
import UserForm from './UserForm';
import ModalComponent from './ModalComponent';

const EditUser = ({ open, onClose, userData }) => {
  const dispatch = useDispatch();

  const [divisionOptions, setDivisionOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  useEffect(() => {
    fetchDivisions()
      .then((response) => {
        setDivisionOptions(response);
      })
      .catch((error) => {
        console.log("Error fetching divisions:", error);
      });
  }, []);

  useEffect(() => {
    if (userData.divisionId) {
      setSelectedDivision(userData.divisionId);

      fetchDistricts(userData.divisionId)
        .then((response) => {
          setDistrictOptions(response);
        })
        .catch((error) => {
          console.log("Error fetching districts:", error);
        });
    }
  }, [userData.divisionId]);

  const handleDivisionChange = (event) => {
    const divisionId = event.target.value;
    const selectedDivision = divisionOptions.find(
      (division) => division.divID === divisionId
    );
  
    setSelectedDivision(selectedDivision.divID);
  
    fetchDistricts(divisionId)
      .then((response) => {
        setDistrictOptions(response);
      })
      .catch((error) => {
        console.log("Error fetching districts:", error);
      });
  };
  
  const handleFormSubmit = (userData) => {
    const { firstName, lastName, employeeType, districtID } = userData;

    const employeeData = {
      id: userData.id,
      firstName,
      lastName,
      employeeType,
      districtID,
    };

    dispatch(updateEmployee(employeeData))
      .then(() => {
        onClose();
        dispatch(fetchAllUsers());
      })
      .catch((error) => {
        console.log("Error saving employee:", error);
      });
  };

  return (
    <ModalComponent open={open} onClose={onClose} title="Edit Employee">
      <UserForm
        userData={userData}
        divisionOptions={divisionOptions}
        districtOptions={districtOptions}
        selectedDivision={selectedDivision}
        handleDivisionChange={handleDivisionChange}
        handleFormSubmit={handleFormSubmit}
      />
    </ModalComponent>
  );
};

export default EditUser;

