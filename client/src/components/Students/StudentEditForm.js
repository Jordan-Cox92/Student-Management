import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
    EditStudent,
    getStudentById,
} from "../../modules/studentManager";

import { getCurrentUserByFirebaseId } from "../../modules/userManager";



export const StudentEditForm = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState({});


    const [userSelections, setUserSelections] = useState({
        name: "",
        age: "",
        email: "",
        schoolName: "",
        id: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        // debugger
        getStudentById(studentId).then((student) => setUserSelections(student));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        const newStudent = {
            name: userSelections.name,
            age: userSelections.age,
            email: userSelections.email,
            schoolName: userSelections.schoolName,
            id: studentId,
        };
        if (
            userSelections.name &&
            userSelections.age &&
            userSelections.email &&
            userSelections.schoolName


        ) {
            EditStudent(newStudent)
                .catch((e) => alert(e.message))
                .then(() => navigate("/students"));
        } else {
            alert("Please complete the form");
        }
    };

    return (

        <FormControl>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Name"
                        value={userSelections.name}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.name = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Age"
                        value={userSelections.age}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.age = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Email"
                        value={userSelections.email}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.email = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>

                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="schoolName"
                        value={userSelections.schoolName}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.schoolName = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>







                <img
                    //src={userSelections.imageUrl}
                    alt={userSelections.name}
                    height="100"
                ></img>









                <Button
                    style={{ marginTop: "2em" }}
                    variant="contained"
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary"
                >
                    Save Student
                </Button>
            </Box>
        </FormControl>
    );
};