type Props = {
  deleteAllCompleted: () => void;
};

export const TodoSummary = ({ deleteAllCompleted }: Props) => {
  return (
    <div className="flex jusitify-end">
      <button onClick={deleteAllCompleted} className="text-sm text-red-500">
        完了した Todo を削除
      </button>
    </div>
  );
};
