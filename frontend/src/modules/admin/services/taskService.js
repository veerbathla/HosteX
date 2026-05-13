import apiClient, { getCached, invalidateCache } from "@/services/apiClient";
import { asArray, unwrapData } from "@/services/normalizers";

export async function getAllTasks() {
    const data = await getCached("/getRequests");
    return asArray(data);
}

export async function createTask(payload) {
    const { data } = await apiClient.post("/createRequest", payload);
    invalidateCache("/tasks");
    return unwrapData(data);
}

export async function updateTaskStatus(id, status) {
    const { data } = await apiClient.put(`/request/${id}`, { status });
    invalidateCache("/tasks");
    return unwrapData(data);
}