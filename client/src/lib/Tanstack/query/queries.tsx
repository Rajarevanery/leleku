import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/AuthAPI/auth";
import {
  getAllMaterial,
  getAllMaterialById,
} from "../../../api/RootAPI/MaterialAPI";
import { getAllQuiz, getSingleQuiz } from "../../../api/RootAPI/QuizAPI";
import {
  getAllNotebooks,
  getSingleNotebook,
} from "../../../api/RootAPI/NotebookAPI";
import { getAllDeckByUserId } from "../../../api/RootAPI/DeckAPI";
import { getAllFlashcardByDeckId } from "../../../api/RootAPI/FlashcardAPI";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get_user"],
    queryFn: async () => await getUser(),
  });
};

export const useGetAllMaterial = () => {
  return useQuery({
    queryKey: ["material"],
    queryFn: async () => await getAllMaterial(),
  });
};

export const useGetMaterialById = (id: number) => {
  return useQuery({
    queryKey: ["material", id],
    queryFn: async () => await getAllMaterialById(id),
  });
};

export const useGetAllQuiz = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: async () => await getAllQuiz(),
  });
};

export const useGetQuizById = (id: number) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: async () => await getSingleQuiz(id),
  });
};

export const useGetAllNotebooks = () => {
  return useQuery({
    queryKey: ["notebook"],
    queryFn: async () => await getAllNotebooks(),
  });
};

export const useGetSingleNotebook = (id: number) => {
  return useQuery({
    queryKey: ["notebook", id],
    queryFn: async () => await getSingleNotebook(id),
  });
};

// ! Deck Get
export const useGetAllDeckByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["deck", userId],
    queryFn: async () => await getAllDeckByUserId(userId),
  });
};

// ! Flashcard
export const useGetFlashcards = (deckId: string) => {
  return useQuery({
    queryKey: ["flashcards", deckId],
    queryFn: () => getAllFlashcardByDeckId(deckId),
  });
};
