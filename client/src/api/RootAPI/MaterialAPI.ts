import axios from "axios";
import type { IMaterial } from "../../types/types";
import { BASE_URL } from "../Endpoint";

export async function createMaterial(data: IMaterial) {
  const { content, difficulty, expReward, expectedTime, title, image_url } =
    data;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/material`,
      {
        title: title,
        content: content,
        difficulty: difficulty,
        expReward: expReward,
        expectedTime: expectedTime,
        image_url: image_url,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error membuat materi", error);
    throw new Error("Failed");
  }
}

export async function editMaterial(data: IMaterial) {
  const { content, difficulty, expReward, expectedTime, title, image_url, id } =
    data;

  try {
    const response = await axios.post(
      `${BASE_URL}/api/material/${id}`,
      {
        title: title,
        content: content,
        difficulty: difficulty,
        expReward: expReward,
        expectedTime: expectedTime,
        image_url: image_url,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error edit materi", error);
    throw new Error("Failed");
  }
}

export async function getAllMaterial() {
  try {
    const response = await axios.get(`${BASE_URL}/api/material`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error get materi", error);
    throw new Error("Failed");
  }
}

export async function getAllMaterialById(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/material/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error get materi", error);
    throw new Error("Failed");
  }
}

export async function deleteMaterial(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/material/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Deleted Error", error);
    throw new Error("Failed");
  }
}
