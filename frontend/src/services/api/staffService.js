import apiClient, { getCached, invalidateCache } from "./apiClient";
import { asArray, unwrapData } from "./normalizers";

export async function getAllStaff() {
    const data = await getCached("/staff");
    return asArray(data);
}

export async function createStaff(payload) {
    const { data } = await apiClient.post("/staff", payload);
    invalidateCache("/staff");
    return unwrapData(data);
}

export async function updateStaffStatus(id, status) {
    const { data } = await apiClient.put(`/staff/${id}`, { status });
    invalidateCache("/staff");
    return unwrapData(data);
}