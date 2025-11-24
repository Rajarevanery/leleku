import { Route, Routes } from "react-router";
import AuthLayout from "./_auth/layout/AuthLayout";
import Login from "./_auth/Login";
import Register from "./_auth/Register";
import Home from "./page/Home";
import WebAppLayout from "./_webapp/layout/WebAppLayout";
import { ToastContainer } from "react-toastify";
import Dashboard from "./_webapp/Dashboard";
import CreateMaterial from "./_webapp/Materi/CreateMaterial";
import CreateQuiz from "./_webapp/Quiz/CreateQuiz";
import QuizList from "./_webapp/Quiz/QuizList";
import MateriList from "./_webapp/Materi/MateriList";
import Materi from "./_webapp/Materi/Materi";
import Quiz from "./_webapp/Quiz/Quiz";
import FlashcardList from "./_webapp/FlashcardList";
import NotebookList from "./_webapp/Notebook/NotebookList";
import CreateNotebook from "./_webapp/Notebook/CreateNotebook";
import Notebook from "./_webapp/Notebook/Notebook";
import EditNotebook from "./_webapp/Notebook/EditNotebook";
import ManageMateri from "./_webapp/Materi/ManageMateri";
import EditMateri from "./_webapp/Materi/EditMateri";
import ManageQuiz from "./_webapp/Quiz/ManageQuiz";
import EditQuiz from "./_webapp/Quiz/EditQuiz";

function App() {
  return (
    <main className="flex min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/webapp" element={<WebAppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-material" element={<CreateMaterial />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
          <Route path="list-quiz" element={<QuizList />} />
          <Route path="list-quiz/:id" element={<Quiz />} />
          <Route path="list-quiz/:id/edit" element={<EditQuiz />} />
          <Route path="list-quiz/manage" element={<ManageQuiz />} />
          <Route path="list-materi" element={<MateriList />} />
          <Route path="list-materi/:id" element={<Materi />} />
          <Route path="list-materi/:id/edit" element={<EditMateri />} />
          <Route path="list-materi/manage" element={<ManageMateri />} />
          <Route path="flashcard" element={<FlashcardList />} />
          <Route path="notebook" element={<NotebookList />} />
          <Route path="notebook/create" element={<CreateNotebook />} />
          <Route path="notebook/:id" element={<Notebook />} />
          <Route path="notebook/:id/edit" element={<EditNotebook />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
