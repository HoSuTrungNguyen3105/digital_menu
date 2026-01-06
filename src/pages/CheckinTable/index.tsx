import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ScanLine } from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";

interface DetectedCode {
  rawValue: string;
  [key: string]: unknown;
}

const CheckinTable = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleScan = useCallback(
    (detectedCodes: DetectedCode[] | null) => {
      if (!detectedCodes?.length || isProcessing) return;

      const tableId = detectedCodes[0].rawValue;
      if (tableId === lastScanned) return;

      setIsProcessing(true);
      setLastScanned(tableId);

      // Simulate network request
      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/menu/${tableId}`);
      }, 1000);
    },
    [isProcessing, lastScanned, navigate]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Scan Table QR</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl shadow-orange-500/10 border border-orange-100 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <ScanLine className="w-8 h-8 text-orange-600" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Check-in Required</h2>
        <p className="text-gray-500 mb-8">
          Scan the QR code on your table to view the menu and order.
        </p>

        <div className="relative overflow-hidden rounded-2xl border-4 border-orange-500 shadow-inner bg-black">
          <Scanner
            onScan={handleScan}
            onError={(error: Error | null) => console.error("Scanner error:", error?.message)}
            constraints={{ facingMode: "environment" }}
            allowMultiple={false}
            scanDelay={1000}
            components={{
              audio: false,
              onOff: false,
              torch: true,
              zoom: false,
              finder: false,
            }}
            styles={{
              container: { width: "100%", aspectRatio: "1/1" },
              video: { width: "100%", height: "100%", objectFit: "cover" },
            }}
          />

          {/* Custom Overlay */}
          <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
            <div className="w-full h-full border-2 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-orange-500 -mt-1 -ml-1" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-orange-500 -mt-1 -mr-1" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-orange-500 -mb-1 -ml-1" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-orange-500 -mb-1 -mr-1" />
            </div>
          </div>

          {isProcessing && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-3" />
              <p className="font-bold text-lg">Verifying...</p>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Point your camera at the QR code
        </p>
      </div>

      {lastScanned && (
        <div className="mt-8 bg-green-50 text-green-700 px-6 py-3 rounded-full font-bold shadow-sm flex items-center gap-2">
          <span>✓ Scanned Table {lastScanned}</span>
        </div>
      )}
    </div>
  );
};

export default CheckinTable;
