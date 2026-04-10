import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

export const getGateDashboard = async () => {
    const { data } = await API.get("/gatekeeper/dashboard");
    return data;
};

export const createIncident = async () => {
    const { data } = await API.post("/gatekeeper/incidents", {
        detail: "Barrier sensor mismatch detected at Alpha Gate",
    });
    return data;
};