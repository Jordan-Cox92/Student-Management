import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    DeleteStudent,
    getStudentById,
} from "../../modules/studentManager";

export const StudentDelete = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getStudentById(studentId).then((student) => setStudent(student));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        DeleteStudent(studentId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/students"));
    };

    return (
        <>
            <h1>Are you sure you want to delete {student.name}?</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="275"

                        alt={student.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {student.name}
                        </Typography>
                        <div>Age: {student.age} </div>
                        <div>Email: {student.email} </div>


                    </CardContent>
                </CardActionArea>
            </Card>
            <Button
                variant="contained"
                onClick={(event) => handleSaveButtonClick(event)}
            >
                Delete
            </Button>
            <Button variant="contained" onClick={() => navigate(`/students`)}>
                Back
            </Button>
        </>
    );
};