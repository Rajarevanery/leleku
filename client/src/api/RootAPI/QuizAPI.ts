import axios from "axios";
import type { IQuiz } from "../../types/types";
import { BASE_URL } from "../Endpoint";

export async function createQuiz(data: IQuiz) {
  const { title, summary, materialId, questions } = data;

  console.log(data);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/quiz`,
      {
        title: title,
        summary: summary,
        materialId: materialId,
        questions: questions,
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

export async function getAllQuiz() {
  try {
    const response = await axios.get(`${BASE_URL}/api/quiz`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat materi", error);
    throw new Error("Failed");
  }
}

export async function getSingleQuiz(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/api/quiz/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error grabbing single quiz", error);
    throw new Error("Failed");
  }
}

export async function editQuiz(id: number, data: IQuiz) {
  const { title, summary, materialId, questions } = data;

  try {
    const response = await axios.put(
      `${BASE_URL}/api/quiz/${id}`,
      {
        title,
        summary,
        materialId,
        questions,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error editing quiz", error);
    throw new Error("Failed");
  }
}



export async function deleteQuiz(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/quiz/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting quiz", error);
    throw new Error("Failed");
  }
}

export async function submitUserQuiz({
  userId,
  quizId,
  expReward,
}: {
  userId: number;
  quizId: number;
  expReward: number;
}) {
  console.log({ userId, quizId, expReward });
  try {
    const response = await axios.post(
      `${BASE_URL}/api/quiz/submit`,
      {
        userId,
        quizId,
        expReward,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error grabbing single quiz", error);
    throw new Error("Failed");
  }
}
