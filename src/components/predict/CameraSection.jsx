import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, CheckCircle2, Loader2, UploadCloud } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function CameraSection({
  status,
  file,
  previewUrl,
  error,
  portion,
  setPortion,
  validateAndSetFile,
  handleReset,
  handleScan,
}) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setCapturedImage(imageSrc);

    // Convert base64 to File object
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const capturedFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        validateAndSetFile(capturedFile);
      });
  }, [webcamRef, validateAndSetFile]);

  const retake = () => {
    setCapturedImage(null);
    handleReset();
  };

  const showBusy = status === 'uploading' || status === 'processing';

  return (
    <Card className="h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>

      <CardHeader>
        <CardTitle>Kamera Pemindai</CardTitle>
        <CardDescription>Ambil foto makananmu untuk mendeteksi detail nutrisi secara langsung.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border-2 border-borderPrimary bg-black flex justify-center items-center min-h-[260px] sm:min-h-[320px]">
            {previewUrl || capturedImage ? (
              <img src={previewUrl || capturedImage} alt="Captured food" className="w-full h-full object-cover" />
            ) : (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }}
                className="w-full h-full object-cover"
              />
            )}

            {/* Status overlays */}
            {(showBusy || status === 'success') && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-4">
                {status === 'success' ? (
                  <>
                    <CheckCircle2 className="h-12 w-12 text-primary mb-3" />
                    <p className="font-medium text-lg">Berhasil Dipindai</p>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
                    <p className="font-medium text-lg">{status === 'processing' ? 'Memproses...' : 'Mengunggah...'}</p>
                  </>
                )}
              </div>
            )}

            {error && (
              <div className="absolute inset-0 bg-destructive/90 flex flex-col items-center justify-center text-white p-6 text-center">
                <p className="font-bold text-lg mb-2">Gagal</p>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 w-full max-w-xl">
            {!(previewUrl || capturedImage) ? (
              <Button onClick={capture} variant="primary" size="default" className="w-full sm:w-auto">
                <Camera className="h-4 w-4 mr-2" />
                Ambil Foto
              </Button>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-xl border border-borderPrimary shrink-0 w-full">
                  <label htmlFor="camera-portion" className="text-sm font-medium text-textSecondary whitespace-nowrap">Jumlah</label>
                  <input
                    id="camera-portion"
                    type="number"
                    min="1"
                    step="0.5"
                    value={portion || 1}
                    onChange={(e) => setPortion(parseFloat(e.target.value) || 1)}
                    className="w-20 bg-background border border-borderPrimary rounded-lg px-3 py-1.5 text-sm font-medium text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3 w-full">
                  <Button
                    onClick={handleScan}
                    variant="primary"
                    disabled={!file || showBusy || status === 'success'}
                    className="w-full sm:w-auto flex-1"
                  >
                    {status === 'success' ? (
                      <><CheckCircle2 className="h-4 w-4 mr-2" /> Selesai</>
                    ) : showBusy ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Memproses</>
                    ) : (
                      <><UploadCloud className="h-4 w-4 mr-2" /> Analisis Gambar</>
                    )}
                  </Button>

                  <Button onClick={retake} variant="secondary" disabled={showBusy} className="w-full sm:w-auto flex-1">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Ulangi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
