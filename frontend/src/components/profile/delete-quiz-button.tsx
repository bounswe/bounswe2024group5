import { Modal } from "antd";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteQuiz } from "../../hooks/api/quizzes/delete";

interface DeleteQuizButtonProps {
  quizId: number;
  quizTitle: string;
  onDeleteSuccess?: () => void;
}

export const DeleteQuizButton = ({
  quizId,
  quizTitle,
  onDeleteSuccess,
}: DeleteQuizButtonProps) => {
  const { mutate: deleteQuiz, isPending } = useDeleteQuiz();

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Delete Quiz",
      content: `Are you sure you want to delete "${quizTitle}"? This action cannot be undone.`,
      okText: "Delete",
      okButtonProps: {
        className: "bg-red-500 hover:bg-red-600",
        loading: isPending,
      },
      cancelText: "Cancel",
      onOk: () => {
        deleteQuiz(quizId, {
          onSuccess: () => {
            onDeleteSuccess?.();
          },
          onError: (error) => {
            Modal.error({
              title: "Failed to delete quiz",
              content:
                error instanceof Error
                  ? error.message
                  : "An error occurred while deleting the quiz",
            });
          },
        });
      },
    });
  };

  return (
    <button
      onClick={showDeleteConfirm}
      className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 transition-colors rounded-lg hover:bg-red-50"
      disabled={isPending}
    >
      <IconTrash size={16} />
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};
