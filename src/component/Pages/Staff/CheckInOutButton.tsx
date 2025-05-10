
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
interface CheckInOutButtonProps {
  bookingId: string;
  stepIndex: number;
  checkInCode: string;
  isCheckedIn: boolean;
  onCheckIn: (
    bookingId: string,
    stepIndex: number,
    code: string
  ) => Promise<boolean>;
  onCheckOut: (bookingId: string, stepIndex: number) => Promise<boolean>;
}
export const CheckInOutButton: React.FC<CheckInOutButtonProps> = ({
  bookingId,
  stepIndex,
  checkInCode,
  isCheckedIn,
  onCheckIn,
  onCheckOut,
}) => {
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const success = await onCheckIn(bookingId, stepIndex, inputCode);
      if (success) {
        setIsCheckInDialogOpen(false);
        toast.success("Check-in thành công");
      } else {
        setError("Mã check-in không chính xác. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra khi check-in. Vui lòng thử lại sau.");
      console.error("Check-in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const success = await onCheckOut(bookingId, stepIndex);
      if (success) {
        setIsCheckOutDialogOpen(false);
        toast.success("Check-out thành công", {
          description: "Dịch vụ đã được đánh dấu là hoàn thành.",
        });
      } else {
        toast.error("Không thể check-out");
      }
    } catch (err) {
      toast.error("Không thể check-out. Vui lòng thử lại sau.");
      console.error("Check-out error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCheckedIn ? (
        <Button 
          variant="outline"
          className="text-green-600 border-green-200 hover:bg-green-50"
          onClick={() => setIsCheckOutDialogOpen(true)}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Check-out
        </Button>
      ) : (
        <Button 
          variant="outline"
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
          onClick={() => setIsCheckInDialogOpen(true)}
        >
          <LogIn className="h-4 w-4 mr-2" />
          Check-in
        </Button>
      )}

      {/* Check-in Dialog */}
      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              <span>Xác nhận check-in</span>
            </DialogTitle>
            <DialogDescription>
              Nhập mã check-in để xác nhận khách hàng đã đến.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="checkin-code" className="text-right">
                Mã check-in
              </Label>
              <Input
                id="checkin-code"
                placeholder="Nhập mã check-in"

                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="col-span-3"
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 col-span-4 text-center">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCheckInDialogOpen(false);
                setError("");
                setInputCode("");
              }}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button 
              type="button"
              disabled={!inputCode || isLoading}
              onClick={handleCheckIn}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận check-in"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check-out Alert Dialog */}
      <AlertDialog open={isCheckOutDialogOpen} onOpenChange={setIsCheckOutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận check-out</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn check-out dịch vụ này? Hành động này sẽ đánh dấu dịch vụ đã hoàn thành và không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleCheckOut();
              }}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? "Đang xử lý..." : "Xác nhận check-out"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
