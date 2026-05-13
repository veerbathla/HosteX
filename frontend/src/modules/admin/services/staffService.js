import apiClient, { getCached, invalidateCache } from "@/services/apiClient";
import { asArray, unwrapData } from "@/services/normalizers";

export async function getAllStaff() {
    const data = await getCached("/getRequest");
    return asArray(data);
}

export async function createStaff(payload) {
    const { data } = await apiClient.post("/createRequest", payload);
    invalidateCache("/getRequest");
    return unwrapData(data);
}

export async function updateStaffStatus(id, status) {
    const { data } = await apiClient.put(`/request/${id}`, { status });
    invalidateCache("/getRequest");
    return unwrapData(data);
}