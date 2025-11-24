import axios from "axios";
import { BASE_URL } from "../Endpoint";
import type { IDeck } from "../../types/types";

export async function getAllDeckByUserId(userId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/deck/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error getting deck", error);
    throw new Error("Failed");
  }
}

export async function createDeck({ title, userId }: IDeck) {
  try {
    const response = await axios.post(`${BASE_URL}/api/deck`, {
      title: title,
      userId: userId,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat deck", error);
    throw new Error("Failed");
  }
}

export async function editDeck({ title, id }: { title: string; id: string }) {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/deck/${id}`,
      {
        title: title,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error membuat deck", error);
    throw new Error("Failed");
  }
}

export async function deleteDeck(id: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/deck/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat deck", error);
    throw new Error("Failed");
  }
}
