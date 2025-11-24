import axios from "axios";
import type { INotebook } from "../../types/types";
import { BASE_URL } from "../Endpoint";

// Create Notebook
export async function createNotebook(data: INotebook) {
  const { title, content, userId } = data;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/notebook`,
      {
        title,
        content,
        userId,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error membuat notebook", error);
    throw new Error("Failed");
  }
}
// Read All Notebook
export async function getAllNotebooks() {
  try {
    const response = await axios.get(`${BASE_URL}/api/notebook`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat notebook", error);
    throw new Error("Failed");
  }
}

// Read Single Notebook
export async function getSingleNotebook(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/notebook/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error membuat notebook", error);
    throw new Error("Failed");
  }
}
// Update Notebook
export async function updateNotebook(id: number, data: Partial<INotebook>) {
  const { title, content } = data;

  try {
    const response = await axios.put(
      `${BASE_URL}/api/notebook/${id}`,
      {
        title,
        content,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating notebook", error);
    throw new Error("Failed");
  }
}

// Delete Notebook
export async function deleteNotebook(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/notebook/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting notebook", error);
    throw new Error("Failed");
  }
}

