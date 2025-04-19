
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  isScanning: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({
  isOpen,
  isScanning,
  onOpenChange,
  onScanComplete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Position the QR code in the frame to scan
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-dashed border-accent/50 rounded-lg flex items-center justify-center bg-black/5">
            <div className="text-center">
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <QrCode className="h-12 w-12 text-accent animate-pulse mb-2" />
                  <div className="text-sm text-muted-foreground">Scanning...</div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <QrCode className="h-12 w-12 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">Camera preview would appear here</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onScanComplete}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
