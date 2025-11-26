import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, registerUser } from "../../../api/AuthAPI/auth";
import type {
  ILogin,
  IMaterial,
  INotebook,
  IQuiz,
  IRegister,
} from "../../../types/types";
import {
  createMaterial,
  getAllMaterialById,
  deleteMaterial,
  editMaterial,
} from "../../../api/RootAPI/MaterialAPI";
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  submitUserQuiz,
} from "../../../api/RootAPI/QuizAPI";
import {
  createNotebook,
  deleteNotebook,
  updateNotebook,
} from "../../../api/RootAPI/NotebookAPI";
import { createDeck, deleteDeck, editDeck } from "../../../api/RootAPI/DeckAPI";
import {
  createFlashcard,
  deleteFlashcard,
  editFlashcard,
} from "../../../api/RootAPI/FlashcardAPI";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ILogin) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IRegister) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};

// ! MATERIAL
export const usePostMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMaterial) => createMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["material"],
      });
    },
  });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["material"],
      });
    },
  });
};

export const useEditMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMaterial) => editMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["material"],
      });
    },
  });
};

// ! CREATE QUIZ
export const usePostQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IQuiz) => createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
  });
};

export const useEditQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IQuiz }) =>
      editQuiz(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
  });
};

// ! SUBMIT USER QUIZ
export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      quizId,
      expReward,
    }: {
      userId: number;
      quizId: number;
      expReward: number;
    }) => submitUserQuiz({ userId, quizId, expReward }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_user"],
      });
    },
  });
};

// ! NOTEBOOKS

// Create notebook
export const usePostNotebook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, content, userId }: INotebook) =>
      createNotebook({ title, content, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notebook"],
      });
    },
  });
};

// Edit notebook
export const useEditNotebook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      content,
      notebookId,
    }: {
      title: string;
      content: string;
      notebookId: number;
    }) => updateNotebook(notebookId, { title, content }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["notebook"],
      }),
  });
};

export const useDeleteNotebook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteNotebook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notebook"],
      });
    },
  });
};

// ! DECK
export const usePostDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, userId }: { title: string; userId: number }) =>
      createDeck({
        title: title,
        userId: userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deck"],
      });
    },
  });
};

export const useDeleteDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deckId: string) => deleteDeck(deckId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deck"],
      });
    },
  });
};

export const useEditDeck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, deckId }: { title: string; deckId: string }) =>
      editDeck({
        title: title,
        id: deckId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deck"],
      });
    },
  });
};

// ! FLASHCARD
// CREATE
export const usePostFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      question,
      answer,
      hint,
      deckId,
    }: {
      question: string;
      answer: string;
      hint: string;
      deckId: string;
    }) =>
      createFlashcard({
        question: question,
        answer: answer,
        hint: hint,
        deckId: deckId,
      }),

    onSuccess: () => {
      // Invalidate flashcards list for that deck
      queryClient.invalidateQueries({
        queryKey: ["flashcards"],
      });
    },
  });
};

// EDIT
export const useEditFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      question,
      answer,
      hint,
      flashcardId,
    }: {
      question: string;
      answer: string;
      hint: string;
      flashcardId: string;
    }) =>
      editFlashcard({
        question: question,
        answer: answer,
        hint: hint,
        flashcardId: flashcardId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcards"],
      });
    },
  });
};

// DELETE
export const useDeleteFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ flashcardId }: { flashcardId: string; }) =>
      deleteFlashcard(flashcardId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["flashcards"],
      });
    },
  });
};
