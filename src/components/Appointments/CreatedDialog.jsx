import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CreatedDialog = ({ showConfirmationDialog, setShowConfirmationDialog }) => {
  return (
    <Dialog open={showConfirmationDialog} onOpenChange={() => {}}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="bg-white rounded-lg shadow-lg max-w-md text-center"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Request Sent!
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 px-2 text-gray-600">
          Your request has been sent. We will notify you once your appointment is confirmed.
        </div>

        <DialogFooter className="justify-center">
          <Button
            onClick={() => setShowConfirmationDialog(false)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatedDialog;
