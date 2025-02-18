import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const steps = [
  { id: 1, label: "Dịch vụ đã chọn" },
  { id: 2, label: "Chọn chuyên viên" },
  { id: 3, label: "Chọn thời gian" },
  { id: 4, label: "Chọn hình thức thanh toán" },
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center space-x-4 text-gray-400 text-sm font-medium">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center space-x-2">
          <Badge
            className={cn(
              "rounded-full w-6 h-6 flex items-center justify-center text-white font-bold",
              currentStep === step.id ? "bg-orange-500" : "bg-gray-300"
            )}
          >
            {step.id}
          </Badge>
          <span
            className={cn(
              currentStep === step.id ? "text-orange-500" : "text-gray-700"
            )}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && <span className="text-gray-700">&mdash;</span>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
