import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllStudents,
    postNewStudent,
} from "../../modules/studentManager";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { BrowserRouter as Router } from "react-router-dom";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "firebase/auth";
import firebase from "firebase/app";




export const AddStudentForm = () => {


    const [student, setStudent] = useState([]);


    const [userSelections, setUserSelections] = useState({
        name: "",
        age: "",
        email: "",
        schoolName: ""

    });



    const navigate = useNavigate();






    useEffect(() => {
        getAllStudents().then((student) => setStudent(student));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        const newStudent = {
            name: userSelections.name,
            age: userSelections.age,
            email: userSelections.email,
            schoolName: userSelections.schoolName

        };
        if (
            userSelections.name &&
            userSelections.age &&
            userSelections.email &&
            userSelections.schoolName


        ) {
            postNewStudent(newStudent)
                .catch((e) => alert(e.message))
                .then(() => {
                    navigate("/students");
                    window.alert("added student");

                });

        } else {
            alert("Please complete the form");
        }
    };

    const handleInputChange = (event) => {
        const copy = { ...userSelections };
        copy[event.target.name] = event.target.value;
        setUserSelections(copy);
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Add New Student</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input id="name_form"
                        required
                        autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="ex.. banana"
                        value={userSelections.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input id="age_form"
                        required
                        autoFocus
                        name="age"
                        type="text"
                        className="form-control"
                        placeholder="example.com"
                        value={userSelections.age}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input id="email_form"
                        required
                        autoFocus
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.email}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="schoolName">School name: </label>
                    <input id="schoolName_form"
                        required
                        autoFocus
                        name="schoolName"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.schoolName}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>





            <Button id="the button"
                style={{ marginTop: "2em" }}
                variant="contained"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}

                className="submit_button"
            >
                {" "}
                Add New Student{" "}
            </Button>
        </form>
    );
};