import apiClient, { getCached, invalidateCache } from "./apiClient";
import { asArray, unwrapData } from "./normalizers";

export async function getAllTasks() {
    const data = await getCached("/tasks");
    return asArray(data);
}

export async function createTask(payload) {
    const { data } = await apiClient.post("/tasks", payload);
    invalidateCache("/tasks");
    return unwrapData(data);
}

export async function updateTaskStatus(id, status) {
    const { data } = await apiClient.put(`/tasks/${id}`, { status });
    invalidateCache("/tasks");
    return unwrapData(data);
}