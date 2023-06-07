import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useRadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllStudents } from "../../modules/studentManager";

import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "firebase/auth";
import firebase from "firebase/app";




export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [user, setUser] = useState([])
    const currentFirebaseUser = firebase.auth().currentUser.uid

    const navigate = useNavigate();

    function createData(
        id,
        name,
        age,
        email,
        schoolName





    ) {
        return {
            id,
            name,
            age,
            email,
            schoolName

        };
    }
    const rows = students.map((student) =>
        createData(
            `${student.id}`,
            `${student.name}`,
            `${student.age}`,
            `${student.email}`,
            `${student.schoolName}`


        )
    );

    useEffect(() => {
        getAllStudents().then((student) => setStudents(student));
    }, []);

    useEffect(() => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }, [])

    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    navigate("students/add");
                }}
            >
                Add New Student
            </Button>



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>School Name</TableCell>




                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.schoolName}</TableCell>



                                <TableCell>





                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/student/edit/${row.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/student/delete/${row.id}`)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}