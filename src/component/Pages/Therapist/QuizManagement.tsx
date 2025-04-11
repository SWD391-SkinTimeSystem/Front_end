import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Question, QuestionResponse } from "../../types/question";
import { toast } from "sonner";

// Sample data
const sampleQuestions: Question[] = [
  {
    no: 1,
    content: "Làn da của bạn cảm thấy như thế nào sau khi rửa mặt?",
    questionOptions: [
      {
        content: "Khô, căng tức",
        id: "opt1",
        skinTypes: { nameSkinType: "Da khô" },
      },
      {
        content: "Bình thường, thoải mái",
        id: "opt2",
        skinTypes: { nameSkinType: "Da thường" },
      },
      {
        content: "Dầu ở vùng chữ T, bình thường ở má",
        id: "opt3",
        skinTypes: { nameSkinType: "Da hỗn hợp" },
      },
      {
        content: "Rất dầu trên toàn bộ khuôn mặt",
        id: "opt4",
        skinTypes: { nameSkinType: "Da dầu" },
      },
    ],
    idQuestion: "q1",
  },
  {
    no: 2,
    content: "Bạn thường xuyên gặp mụn không?",
    questionOptions: [
      {
        content: "Hiếm khi hoặc không bao giờ",
        id: "opt1",
        skinTypes: { nameSkinType: "Da thường" },
      },
      {
        content: "Thỉnh thoảng, chủ yếu khi căng thẳng",
        id: "opt2",
        skinTypes: { nameSkinType: "Da hỗn hợp" },
      },
      {
        content: "Thường xuyên, đặc biệt ở vùng chữ T",
        id: "opt3",
        skinTypes: { nameSkinType: "Da dầu" },
      },
      {
        content: "Rất thường xuyên trên toàn mặt",
        id: "opt4",
        skinTypes: { nameSkinType: "Da nhạy cảm" },
      },
    ],
    idQuestion: "q2",
  },
  {
    no: 3,
    content: "Lỗ chân lông của bạn trông như thế nào?",
    questionOptions: [
      {
        content: "Gần như không nhìn thấy",
        id: "opt1",
        skinTypes: { nameSkinType: "Da thường" },
      },
      {
        content: "Nhỏ, khó nhìn thấy",
        id: "opt2",
        skinTypes: { nameSkinType: "Da hỗn hợp" },
      },
      {
        content: "Nhìn thấy rõ ở vùng chữ T",
        id: "opt3",
        skinTypes: { nameSkinType: "Da dầu" },
      },
      {
        content: "Lớn và dễ thấy trên cả khuôn mặt",
        id: "opt4",
        skinTypes: { nameSkinType: "Da nhạy cảm" },
      },
    ],
    idQuestion: "q3",
  },
];

const sampleResponses: QuestionResponse[] = [
  {
    userId: "user1",
    resultIds: ["q1-opt2", "q2-opt3", "q3-opt3"],
  },
  {
    userId: "user2",
    resultIds: ["q1-opt1", "q2-opt1", "q3-opt1"],
  },
  {
    userId: "user3",
    resultIds: ["q1-opt4", "q2-opt4", "q3-opt4"],
  },
];

interface Quiz {
  questions: Question[];
}
// QuizManagement component
const QuizManagement: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [responses, setResponses] =
    useState<QuestionResponse[]>(sampleResponses);

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const availableSkinTypes = [
    "Da khô",
    "Da dầu",
    "Da hỗn hợp",
    "Da nhạy cảm",
  ];
  const [newQuestion, setNewQuestion] = useState<Question>({
    no: 0,
    content: "",
    questionOptions: [
      { content: "", id: "", skinTypes: { nameSkinType: "" } },
    ],
    idQuestion: "",
  });

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Giả định API endpoint
        const response = await fetch("/api/quiz");
        const data = await response.json();
        setQuiz(data);
        setQuestions(data.questions || []);
        setResponses(data.responses || []);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Không thể tải thông tin bài quiz", {
          description: "Không thể tải thông tin bài quiz",
        });
      }
    };

    fetchQuiz();
  }, []);

  // Hàm bổ trợ để tạo ID duy nhất
  const generateUniqueId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Hàm cập nhật toàn bộ quiz
  const updateQuiz = async () => {
    if (!quiz) return;

    setIsSaving(true);
    try {
      // Renumber questions
      const updatedQuestions = questions.map((q, index) => ({
        ...q,
        no: index + 1,
      }));

      const updatedQuiz = {
        ...quiz,
        questions: updatedQuestions,
        responses: responses,
      };

      // Gọi API cập nhật quiz
      await fetch("/api/quiz", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuiz),
      });

      setQuestions(updatedQuestions);

      toast.error("Bài quiz đã được cập nhật", {
        description: "Bài quiz đã được cập nhật",
      });
    } catch (error) {
      console.error("Error updating quiz:", error);

      toast.error("Không thể cập nhật bài quiz", {
        description: "Không thể cập nhật bài quiz",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle question expansion
  const toggleExpand = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  // Add new question
  const handleAddQuestion = () => {
    // Generate new ID
    const newId = generateUniqueId("q");
    const newQuestionWithId = {
      ...newQuestion,
      no: questions.length + 1,
      idQuestion: newId,
      questionOptions: newQuestion.questionOptions.map((opt, index) => ({
        ...opt,
        id: generateUniqueId("opt"),
      })),
    };

    setQuestions([...questions, newQuestionWithId]);
    setIsAddDialogOpen(false);

    // Reset form
    setNewQuestion({
      no: 0,
      content: "",
      questionOptions: [
        { content: "", id: "", skinTypes: { nameSkinType: "" } },
      ],
      idQuestion: "",
    });
  };

  // Edit question
  const handleEditQuestion = () => {
    if (editingQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.idQuestion === editingQuestion.idQuestion ? editingQuestion : q
      );
      setQuestions(updatedQuestions);
      setIsEditDialogOpen(false);
      setEditingQuestion(null);
    }
  };

  // Delete question
  const handleDeleteQuestion = () => {
    if (selectedQuestion) {
      const updatedQuestions = questions.filter(
        (q) => q.idQuestion !== selectedQuestion.idQuestion
      );
      setQuestions(updatedQuestions);
      setIsDeleteDialogOpen(false);
      setSelectedQuestion(null);
    }
  };

  // Hàm sắp xếp lại câu hỏi
  const moveQuestion = (idQuestion: string, direction: "up" | "down") => {
    const index = questions.findIndex((q) => q.idQuestion === idQuestion);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === questions.length - 1) ||
      index === -1
    ) {
      return;
    }

    const updatedQuestions = [...questions];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    [updatedQuestions[index], updatedQuestions[targetIndex]] = [
      updatedQuestions[targetIndex],
      updatedQuestions[index],
    ];

    setQuestions(updatedQuestions);
  };

  // Add option to new question
  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      questionOptions: [
        ...newQuestion.questionOptions,
        { content: "", id: "", skinTypes: { nameSkinType: "" } },
      ],
    });
  };

  // Add option to editing question
  const addEditOption = () => {
    if (editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: [
          ...editingQuestion.questionOptions,
          {
            content: "",
            id: generateUniqueId("opt"),
            skinTypes: { nameSkinType: "" },
          },
        ],
      });
    }
  };

  // Remove option from new question
  const removeOption = (index: number) => {
    const options = [...newQuestion.questionOptions];
    options.splice(index, 1);
    setNewQuestion({
      ...newQuestion,
      questionOptions: options,
    });
  };

  // Remove option from editing question
  const removeEditOption = (index: number) => {
    if (editingQuestion && editingQuestion.questionOptions.length > 1) {
      const options = [...editingQuestion.questionOptions];
      options.splice(index, 1);
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: options,
      });
    }
  };

  // Handle new question content change
  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({
      ...newQuestion,
      content: e.target.value,
    });
  };

  // Handle new option content change
  const handleNewOptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const options = [...newQuestion.questionOptions];
    options[index] = { ...options[index], content: e.target.value };
    setNewQuestion({
      ...newQuestion,
      questionOptions: options,
    });
  };

  // Handle skin type selection for new option
  const handleNewOptionSkinTypeChange = (index: number, skinType: string) => {
    const options = [...newQuestion.questionOptions];
    options[index] = {
      ...options[index],
      skinTypes: { nameSkinType: skinType }, // Gán trực tiếp một loại da mới
    };

    setNewQuestion({
      ...newQuestion,
      questionOptions: options,
    });
  };

  // Handle editing question content change
  const handleEditQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        content: e.target.value,
      });
    }
  };

  // Handle editing option content change
  const handleEditOptionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (editingQuestion) {
      const options = [...editingQuestion.questionOptions];
      options[index] = { ...options[index], content: e.target.value };
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: options,
      });
    }
  };

  // Handle skin type selection for editing option
  const handleEditOptionSkinTypeChange = (index: number, skinType: string) => {
    if (editingQuestion) {
      const options = [...editingQuestion.questionOptions];
      options[index] = {
        ...options[index],
        skinTypes: { nameSkinType: skinType }, // Gán trực tiếp một loại da mới
      };

      setEditingQuestion({
        ...editingQuestion,
        questionOptions: options,
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="questions">
        {/* Questions Management Tab */}
        <TabsContent value="questions">
          <Card className="border-t-4 border-t-[#326e51]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách câu hỏi</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={updateQuiz}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSaving ? "Đang lưu..." : "Lưu tất cả thay đổi"}
                </Button>
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-[#326e51] hover:bg-[#275941]">
                      <Plus size={16} className="mr-2" />
                      Thêm câu hỏi
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Thêm câu hỏi mới</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="question"
                          className="text-sm font-medium"
                        >
                          Câu hỏi
                        </label>
                        <Input
                          id="question"
                          value={newQuestion.content}
                          onChange={handleNewQuestionChange}
                          placeholder="Nhập câu hỏi"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Các lựa chọn
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addOption}
                            className="h-8 text-xs"
                          >
                            <Plus size={14} className="mr-1" />
                            Thêm lựa chọn
                          </Button>
                        </div>
                        {newQuestion.questionOptions.map((option, index) => (
                          <div key={index} className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <Input
                                value={option.content}
                                onChange={(e) =>
                                  handleNewOptionChange(index, e)
                                }
                                placeholder={`Lựa chọn ${index + 1}`}
                              />
                              {newQuestion.questionOptions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeOption(index)}
                                  className="h-8 w-8 text-red-500"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              )}
                            </div>
                            <div>
                              <label className="text-xs font-medium mb-1 block">
                                Loại da phù hợp:
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {availableSkinTypes.map((skinType) => (
                                  <Button
                                    key={skinType}
                                    type="button"
                                    size="sm"
                                    variant={
                                      option.skinTypes.nameSkinType === skinType // So sánh với nameSkinType
                                        ? "default"
                                        : "outline"
                                    }
                                    className={
                                      option.skinTypes.nameSkinType === skinType // So sánh với nameSkinType
                                        ? "h-7 text-xs bg-[#326e51] hover:bg-[#275941]"
                                        : "h-7 text-xs"
                                    }
                                    onClick={() =>
                                      handleNewOptionSkinTypeChange(
                                        index,
                                        skinType
                                      )
                                    }
                                  >
                                    {skinType}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        className="bg-[#326e51] hover:bg-[#275941]"
                        onClick={handleAddQuestion}
                        disabled={
                          !newQuestion.content ||
                          newQuestion.questionOptions.some(
                            (opt) => !opt.content || !opt.skinTypes.nameSkinType
                          )
                        }
                      >
                        Lưu
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {questions.map((question) => (
                  <div
                    key={question.idQuestion}
                    className="border rounded-lg overflow-hidden bg-white shadow-sm"
                  >
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleExpand(question.idQuestion)}
                    >
                      <div className="flex items-center">
                        <span className="bg-[#326e51] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm">
                          {question.no}
                        </span>
                        <span className="font-medium">{question.content}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveQuestion(question.idQuestion, "up");
                          }}
                          disabled={question.no === 1}
                          className="h-8 w-8 mr-1 text-gray-500 hover:text-[#326e51]"
                        >
                          <ChevronUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveQuestion(question.idQuestion, "down");
                          }}
                          disabled={question.no === questions.length}
                          className="h-8 w-8 mr-1 text-gray-500 hover:text-[#326e51]"
                        >
                          <ChevronDown size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingQuestion({ ...question });
                            setIsEditDialogOpen(true);
                          }}
                          className="h-8 w-8 mr-1 text-gray-500 hover:text-[#326e51]"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuestion(question);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="h-8 w-8 mr-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                        {expandedQuestion === question.idQuestion ? (
                          <ChevronUp size={18} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-500" />
                        )}
                      </div>
                    </div>
                    {expandedQuestion === question.idQuestion && (
                      <div className="p-4 bg-gray-50 border-t">
                        <h4 className="text-sm font-medium mb-2">
                          Các lựa chọn:
                        </h4>
                        {question.questionOptions.map((option) => (
                          <div
                            key={option.id}
                            className="pl-8 mb-3 border-b pb-2 last:border-b-0 last:pb-0"
                          >
                            <div className="text-sm font-medium">
                              {option.content}
                            </div>
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">
                                Loại da phù hợp:{" "}
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                              {option.skinTypes && option.skinTypes.nameSkinType ? (
  <span className="px-2 py-1 bg-[#e6f0eb] text-[#326e51] rounded text-xs">
    {option.skinTypes.nameSkinType}
  </span>
) : (
  <span className="text-xs text-gray-500 italic">Chưa chọn loại da</span>
)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Edit Question Dialog */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa câu hỏi</DialogTitle>
                  </DialogHeader>
                  {editingQuestion && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="edit-question"
                          className="text-sm font-medium"
                        >
                          Câu hỏi
                        </label>
                        <Input
                          id="edit-question"
                          value={editingQuestion.content}
                          onChange={handleEditQuestionChange}
                          placeholder="Nhập câu hỏi"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Các lựa chọn
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addEditOption}
                            className="h-8 text-xs"
                          >
                            <Plus size={14} className="mr-1" />
                            Thêm lựa chọn
                          </Button>
                        </div>
                        {editingQuestion.questionOptions.map(
                          (option, index) => (
                            <div key={index} className="grid gap-2">
                              <div className="flex items-center gap-2">
                                <Input
                                  value={option.content}
                                  onChange={(e) =>
                                    handleEditOptionChange(index, e)
                                  }
                                  placeholder={`Lựa chọn ${index + 1}`}
                                />
                                {editingQuestion.questionOptions.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeEditOption(index)}
                                    className="h-8 w-8 text-red-500"
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                )}
                              </div>
                              <div>
                                <label className="text-xs font-medium mb-1 block">
                                  Loại da phù hợp:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                  {availableSkinTypes.map((skinType) => (
                                    <Button
                                      key={skinType}
                                      type="button"
                                      size="sm"
                                      variant={option.skinTypes && option.skinTypes.nameSkinType === skinType ? "default" : "outline"}

                                      className={option.skinTypes && option.skinTypes.nameSkinType === skinType ? "h-7 text-xs bg-[#326e51] hover:bg-[#275941]" : "h-7 text-xs"}


                                      onClick={() =>
                                        handleEditOptionSkinTypeChange(
                                          index,
                                          skinType
                                        )
                                      }
                                    >
                                      {skinType}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Hủy
                    </Button>
                    <Button
                      className="bg-[#326e51] hover:bg-[#275941]"
                      onClick={handleEditQuestion}
                      disabled={
                        !editingQuestion ||
                        !editingQuestion.content ||
                        editingQuestion.questionOptions.some(
                          (opt) => !opt.content || !opt.skinTypes || !opt.skinTypes.nameSkinType
                        )
                      }
                    >
                      Lưu thay đổi
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Delete Question Dialog */}
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xóa câu hỏi</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn xóa câu hỏi này? Hành động này không
                      thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteQuestion}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizManagement;
