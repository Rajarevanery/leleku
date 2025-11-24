// model Flashcard {
//   id       String  @id @default(uuid())
//   question String
//   answer   String
//   hint     String?

import axios from "axios";
import { BASE_URL } from "../Endpoint";
import type { IEditFlashcard, IFlashcard } from "../../types/types";

//   deckId String
//   deck   Deck   @relation(fields: [deckId], references: [id], onDelete: Cascade)
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

export async function createFlashcard({
  question,
  answer,
  hint,
  deckId,
}: IFlashcard) {
  try {
    const response = await axios.post(`${BASE_URL}/api/flashcard`, {
      question: question,
      answer: answer,
      hint: hint,
      deckId: deckId,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat deck", error);
    throw new Error("Failed");
  }
}

export async function getAllFlashcardByDeckId(deckId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/api/flashcard/${deckId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error membuat deck", error);
    throw new Error("Failed");
  }
}

export async function editFlashcard({
  question,
  answer,
  hint,
  flashcardId,
}: IEditFlashcard) {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/flashcard/${flashcardId}`,
      {
        question: question,
        answer: answer,
        hint: hint,
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

export async function deleteFlashcard(flashcardId: string) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/flashcard/${flashcardId}`,
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
