import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import {Question, QuestionResponse, QuestionRecommendation } from "../../types/question"


// Sample data
//call api thay cho cai Question nay nha, vao ../../types/question se co dinh nghia cho may nay
const sampleQuestions: Question[] = [
  {
    no: 1,
    content: "Làn da của bạn cảm thấy như thế nào sau khi rửa mặt?",
    questionOptions: [
      { content: "Khô, căng tức", id: "opt1" },
      { content: "Bình thường, thoải mái", id: "opt2" },
      { content: "Dầu ở vùng chữ T, bình thường ở má", id: "opt3" },
      { content: "Rất dầu trên toàn bộ khuôn mặt", id: "opt4" }
    ],
    idQuestion: "q1"
  },
  {
    no: 2,
    content: "Bạn thường xuyên gặp mụn không?",
    questionOptions: [
      { content: "Hiếm khi hoặc không bao giờ", id: "opt1" },
      { content: "Thỉnh thoảng, chủ yếu khi căng thẳng", id: "opt2" },
      { content: "Thường xuyên, đặc biệt ở vùng chữ T", id: "opt3" },
      { content: "Rất thường xuyên trên toàn mặt", id: "opt4" }
    ],
    idQuestion: "q2"
  },
  {
    no: 3,
    content: "Lỗ chân lông của bạn trông như thế nào?",
    questionOptions: [
      { content: "Gần như không nhìn thấy", id: "opt1" },
      { content: "Nhỏ, khó nhìn thấy", id: "opt2" },
      { content: "Nhìn thấy rõ ở vùng chữ T", id: "opt3" },
      { content: "Lớn và dễ thấy trên cả khuôn mặt", id: "opt4" }
    ],
    idQuestion: "q3"
  }
];

const sampleResponses: QuestionResponse[] = [
  {
    userId: "user1",
    resultIds: ["q1-opt2", "q2-opt3", "q3-opt3"]
  },
  {
    userId: "user2", 
    resultIds: ["q1-opt1", "q2-opt1", "q3-opt1"]
  },
  {
    userId: "user3",
    resultIds: ["q1-opt4", "q2-opt4", "q3-opt4"]
  }
];

const sampleRecommendations: Record<string, QuestionRecommendation> = {
  "user1": {
    skinTypes: [
      { nameSkinType: "Da hỗn hợp", percentage: 80 },
      { nameSkinType: "Da thường", percentage: 20 }
    ],
    services: [
      { id: "serv1", nameService: "Làm sạch chuyên sâu" },
      { id: "serv2", nameService: "Cân bằng dầu vùng T" }
    ]
  },
  "user2": {
    skinTypes: [
      { nameSkinType: "Da khô", percentage: 90 },
      { nameSkinType: "Da nhạy cảm", percentage: 10 }
    ],
    services: [
      { id: "serv3", nameService: "Dưỡng ẩm chuyên sâu" },
      { id: "serv4", nameService: "Liệu pháp bảo vệ da" }
    ]
  },
  "user3": {
    skinTypes: [
      { nameSkinType: "Da dầu", percentage: 95 },
      { nameSkinType: "Da mụn", percentage: 5 }
    ],
    services: [
      { id: "serv5", nameService: "Điều trị mụn" },
      { id: "serv6", nameService: "Kiểm soát dầu" }
    ]
  }
};

const skinTypeScoring = [
  { range: "0-10", type: "Da khô" },
  { range: "11-20", type: "Da thường" },
  { range: "21-30", type: "Da hỗn hợp" },
  { range: "31-40", type: "Da dầu" }
];

// QuizManagement component
const QuizManagement: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [responses, setResponses] = useState<QuestionResponse[]>(sampleResponses);
  const [recommendations, setRecommendations] = useState<Record<string, QuestionRecommendation>>(sampleRecommendations);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    no: 0,
    content: "",
    questionOptions: [{ content: "", id: "" }],
    idQuestion: ""
  });

  // Toggle question expansion
  const toggleExpand = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  // Add new question
  const handleAddQuestion = () => {
    // Generate new ID
    const newId = `q${questions.length + 1}`;
    const newQuestionWithId = {
      ...newQuestion,
      no: questions.length + 1,
      idQuestion: newId,
      questionOptions: newQuestion.questionOptions.map((opt, index) => ({
        ...opt,
        id: `opt${index + 1}`
      }))
    };
    
    setQuestions([...questions, newQuestionWithId]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewQuestion({
      no: 0,
      content: "",
      questionOptions: [{ content: "", id: "" }],
      idQuestion: ""
    });
  };

  // Edit question
  const handleEditQuestion = () => {
    if (editingQuestion) {
      const updatedQuestions = questions.map(q => 
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
      const updatedQuestions = questions.filter(q => q.idQuestion !== selectedQuestion.idQuestion);
      // Reorder questions
      const reorderedQuestions = updatedQuestions.map((q, index) => ({
        ...q,
        no: index + 1
      }));
      setQuestions(reorderedQuestions);
      setIsDeleteDialogOpen(false);
      setSelectedQuestion(null);
    }
  };

  // Add option to new question
  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      questionOptions: [
        ...newQuestion.questionOptions,
        { content: "", id: "" }
      ]
    });
  };

  // Add option to editing question
  const addEditOption = () => {
    if (editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: [
          ...editingQuestion.questionOptions,
          { content: "", id: `opt${editingQuestion.questionOptions.length + 1}` }
        ]
      });
    }
  };

  // Remove option from new question
  const removeOption = (index: number) => {
    const options = [...newQuestion.questionOptions];
    options.splice(index, 1);
    setNewQuestion({
      ...newQuestion,
      questionOptions: options
    });
  };

  // Remove option from editing question
  const removeEditOption = (index: number) => {
    if (editingQuestion && editingQuestion.questionOptions.length > 1) {
      const options = [...editingQuestion.questionOptions];
      options.splice(index, 1);
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: options
      });
    }
  };

  // Handle new question content change
  const handleNewQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestion({
      ...newQuestion,
      content: e.target.value
    });
  };

  // Handle new option content change
  const handleNewOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const options = [...newQuestion.questionOptions];
    options[index] = { ...options[index], content: e.target.value };
    setNewQuestion({
      ...newQuestion,
      questionOptions: options
    });
  };

  // Handle editing question content change
  const handleEditQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingQuestion) {
      setEditingQuestion({
        ...editingQuestion,
        content: e.target.value
      });
    }
  };

  // Handle editing option content change
  const handleEditOptionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingQuestion) {
      const options = [...editingQuestion.questionOptions];
      options[index] = { ...options[index], content: e.target.value };
      setEditingQuestion({
        ...editingQuestion,
        questionOptions: options
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="questions">
        <TabsList className="grid w-full grid-cols-3">
            {/* Chia thành 3 tab cho task 3 ngày, Task hôm 13/3 thì chỉ quan tâm Quản lý câu hỏi */}
          <TabsTrigger value="questions">Quản lý câu hỏi</TabsTrigger>
          <TabsTrigger value="results">Kết quả người dùng</TabsTrigger>
          <TabsTrigger value="analysis">Phân tích kết quả</TabsTrigger>
        </TabsList>

        {/* Bắt đầu từ cái Tabs Content này này, đừng mất công đọc tabs ở dưới chi nhá */}
        {/* Questions Management Tab */}
        <TabsContent value="questions">
          <Card className="border-t-4 border-t-[#326e51]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách câu hỏi</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                      <label htmlFor="question" className="text-sm font-medium">Câu hỏi</label>
                      <Input
                        id="question"
                        value={newQuestion.content}
                        onChange={handleNewQuestionChange}
                        placeholder="Nhập câu hỏi"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Các lựa chọn</label>
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
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={option.content}
                            onChange={(e) => handleNewOptionChange(index, e)}
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
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button 
                      className="bg-[#326e51] hover:bg-[#275941]"
                      onClick={handleAddQuestion}
                      disabled={!newQuestion.content || newQuestion.questionOptions.some(opt => !opt.content)}
                    >
                      Lưu
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
                            setEditingQuestion({...question});
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
                        <h4 className="text-sm font-medium mb-2">Các lựa chọn:</h4>
                        <ul className="pl-8 list-disc space-y-1">
                          {question.questionOptions.map((option) => (
                            <li key={option.id} className="text-sm">
                              {option.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Edit Question Dialog */}
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa câu hỏi</DialogTitle>
                  </DialogHeader>
                  {editingQuestion && (
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label htmlFor="edit-question" className="text-sm font-medium">Câu hỏi</label>
                        <Input
                          id="edit-question"
                          value={editingQuestion.content}
                          onChange={handleEditQuestionChange}
                          placeholder="Nhập câu hỏi"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Các lựa chọn</label>
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
                        {editingQuestion.questionOptions.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={option.content}
                              onChange={(e) => handleEditOptionChange(index, e)}
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
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button 
                      className="bg-[#326e51] hover:bg-[#275941]"
                      onClick={handleEditQuestion}
                      disabled={!editingQuestion || !editingQuestion.content || editingQuestion.questionOptions.some(opt => !opt.content)}
                    >
                      Lưu thay đổi
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Delete Question Dialog */}
              <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xóa câu hỏi</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn xóa câu hỏi này? Hành động này không thể hoàn tác.
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
        
        {/* User Results Tab */}
        <TabsContent value="results">
          <Card className="border-t-4 border-t-[#326e51]">
            <CardHeader>
              <CardTitle>Kết quả người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {responses.map((response) => {
                  const userRec = recommendations[response.userId];
                  return (
                    <Card key={response.userId} className="overflow-hidden shadow-sm">
                      <CardHeader className="bg-gray-50 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Người dùng: {response.userId}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Câu trả lời:</h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              {response.resultIds.map((resultId) => {
                                const [qId, optId] = resultId.split('-');
                                const question = questions.find(q => q.idQuestion === qId);
                                const option = question?.questionOptions.find(o => o.id === optId);
                                return (
                                  <div key={resultId} className="mb-2 text-sm">
                                    <span className="font-medium">{question?.content}:</span> {option?.content}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Result Analysis Tab */}
        <TabsContent value="analysis">
          <Card className="border-t-4 border-t-[#326e51]">
            <CardHeader>
              <CardTitle>Phân tích kết quả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                 {/* Scoring Reference */}
                 <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Bảng tiêu chuẩn phân loại da</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-3">Điểm số</th>
                            <th className="text-left py-2 px-3">Loại da</th>
                            <th className="text-left py-2 px-3">Đặc điểm</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-3">0-10</td>
                            <td className="py-2 px-3 font-medium">Da khô</td>
                            <td className="py-2 px-3">Da căng, bong tróc, thiếu độ ẩm</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-3">11-20</td>
                            <td className="py-2 px-3 font-medium">Da thường</td>
                            <td className="py-2 px-3">Da cân bằng, ít vấn đề</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-3">21-30</td>
                            <td className="py-2 px-3 font-medium">Da hỗn hợp</td>
                            <td className="py-2 px-3">Dầu ở vùng T, khô hoặc thường ở má</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-3">31-40</td>
                            <td className="py-2 px-3 font-medium">Da dầu</td>
                            <td className="py-2 px-3">Dầu trên toàn mặt, lỗ chân lông to</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                {responses.map((response) => {
                  const userRec = recommendations[response.userId];
                  return (
                    <Card key={response.userId} className="overflow-hidden shadow-sm">
                      <CardHeader className="bg-gray-50 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Người dùng: {response.userId}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-3">Loại da:</h4>
                            {userRec?.skinTypes.map((skin) => (
                              <div key={skin.nameSkinType} className="mb-2">
                                <div className="flex justify-between items-center mb-1">
                                  <span>{skin.nameSkinType}</span>
                                  <span className="font-medium">{skin.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-[#326e51] h-2.5 rounded-full" 
                                    style={{ width: `${skin.percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="font-medium mb-3">Dịch vụ gợi ý:</h4>
                            <ul className="space-y-2">
                              {userRec?.services.map((service) => (
                                <li 
                                  key={service.id} 
                                  className="flex items-center bg-gray-50 p-2 rounded-md"
                                >
                                  <div className="w-3 h-3 rounded-full bg-[#326e51] mr-2"></div>
                                  {service.nameService}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

               
              </div>
            </CardContent>
          </Card>
        </TabsContent>

       
      </Tabs>
    </div>
  );
};

export default QuizManagement;