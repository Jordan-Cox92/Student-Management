import { getToken } from "./authManager";

const _apiUrl = "/api/student";

export const getAllStudents = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get students"
                );
            }
        });
    });
};

export const postNewStudent = (newStudent) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("This student already exists");
            }
        });
    });
};

export const getStudentById = (studentId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/student/${studentId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get students"
                );
            }
        });
    });
};

export const DeleteStudent = (studentId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/student/delete/${studentId}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to delete student"
                );
            }
        });
    });
};

export const EditStudent = (student) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/student/edit/${student.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to edit student"
                );
            }
        });
    });
};