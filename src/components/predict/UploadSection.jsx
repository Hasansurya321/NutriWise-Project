import { useRef } from 'react';
import { AlertCircle, CheckCircle2, FileImage, ImagePlus, Loader2, ScanLine, UploadCloud, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../utils/cn';
import { useImagePredict } from '../../hooks/useImagePredict';

const MAX_FILE_SIZE_MB = 10;

function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadSection({
  status,
  file,
  previewUrl,
  error,
  portion,
  setPortion,
  dragCounterRef,
  validateAndSetFile,
  handleReset,
  handleScan,
  resetDragState,
}) {
  const inputRef = useRef(null);

  const handleLocalReset = () => {
    handleReset();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFiles = (fileList) => {
    const nextFile = fileList?.[0];

    validateAndSetFile(nextFile);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);

    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();

    event.stopPropagation();

    setStatus('idle');

    resetDragState();

    handleFiles(event.dataTransfer.files);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();

    event.stopPropagation();

    dragCounterRef.current += 1;

    setStatus('dragging');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();

    event.stopPropagation();

    dragCounterRef.current -= 1;

    if (dragCounterRef.current <= 0) {
      setStatus('idle');

      resetDragState();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    event.stopPropagation();

    if (status !== 'dragging') {
      setStatus('dragging');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      openFilePicker();
    }
  };

  // Reused handler helpers


  const showActiveDrag = status === 'dragging';

  const showBusy = status === 'uploading' || status === 'processing';

  return (
    <Card className="h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
      <CardHeader>
        <CardTitle>Pemindai Makanan</CardTitle>
        <CardDescription>Unggah atau ambil foto makananmu untuk mendeteksi kalori, protein, karbohidrat, dan lemak secara otomatis dengan AI.</CardDescription>
      </CardHeader>

      <CardContent>
        <div
          role="button"
          tabIndex={0}
          aria-label="Unggah gambar makanan"
          aria-busy={showBusy}
          onClick={openFilePicker}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          className={cn(
            `
              flex min-h-[220px] flex-col items-center
              justify-center rounded-3xl border-2
              border-dashed p-6 text-center
              transition-all duration-200
              sm:min-h-[260px]
              sm:p-8
              lg:min-h-[320px]
            `,
            showActiveDrag
              ? `
                  border-primary bg-primary/10
                  shadow-glow
                `
              : `
                  border-primary/30 bg-primary/5
                  hover:border-primary/40
                  hover:bg-primary/10
                `,
          )}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />

          {file ? (
            <div className="w-full max-w-xl space-y-5">
              <div
                className="
                  flex flex-col items-center gap-4
                  sm:flex-row
                  sm:items-center
                  sm:text-left
                "
              >
                <div
                  className="
                    flex h-16 w-16 items-center
                    justify-center overflow-hidden
                    rounded-2xl bg-primary/10
                    text-primary
                  "
                >
                  {previewUrl ? <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" /> : <FileImage className="h-7 w-7" />}
                </div>

                <div className="space-y-1">
                  <div
                    className="
                      flex flex-wrap items-center
                      justify-center gap-2
                      sm:justify-start
                    "
                  >
                    <p
                      className="
                        text-base font-semibold
                        text-textPrimary
                      "
                    >
                      {file.name}
                    </p>

                    {status === 'success' ? (
                      <span
                        className="
                          inline-flex items-center gap-1
                          rounded-full border
                          border-success/20
                          bg-success/10 px-2.5 py-1
                          text-xs font-medium
                          text-success
                        "
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Selesai
                      </span>
                    ) : status === 'processing' ? (
                      <span
                        className="
                          inline-flex items-center gap-1
                          rounded-full border
                          border-warning/20
                          bg-warning/10 px-2.5 py-1
                          text-xs font-medium
                          text-warning
                        "
                      >
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Memproses
                      </span>
                    ) : status === 'uploading' ? (
                      <span
                        className="
                          inline-flex items-center gap-1
                          rounded-full border
                          border-primary/20
                          bg-primary/10 px-2.5 py-1
                          text-xs font-medium
                          text-primary
                        "
                      >
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Mengunggah
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm text-textSecondary">{formatFileSize(file.size)} · Tarik gambar lain atau klik telusuri untuk mengganti.</p>
                </div>
              </div>

              <div
                className="
                  rounded-2xl border border-borderSoft
                  bg-white/3 p-4 text-left
                "
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        rounded-2xl border
                        border-borderCard bg-primary/10
                        p-3 text-primary shrink-0
                      "
                    >
                      <ScanLine className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-medium text-textPrimary">Siap untuk analisis AI</h4>

                      <p className="text-sm text-textSecondary">Mulai pemindaian untuk mendeteksi detail nutrisi dari gambar makanan yang dipilih.</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-xl border border-borderPrimary shrink-0 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                <label htmlFor="portion" className="text-sm font-medium text-textSecondary whitespace-nowrap">Jumlah</label>
                <input
                  id="portion"
                  type="number"
                  min="1"
                  step="0.5"
                  value={portion || 1}
                  onChange={(e) => setPortion(parseFloat(e.target.value) || 1)}
                  className="w-20 bg-background border border-borderPrimary rounded-lg px-3 py-1.5 text-sm font-medium text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>

              <div
                className="
                  flex flex-col gap-3
                  sm:flex-row
                  sm:justify-center
                "
              >
                <Button
                  type="button"
                  variant="default"
                  className="w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation();

                    handleScan();
                  }}
                  disabled={!file || status === 'processing' || status === 'uploading'}
                >
                  {status === 'processing' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Memindai
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Selesai, Scan ulang?
                    </>
                  ) : (
                    <>
                      <ScanLine className="h-4 w-4" />
                      Mulai Pemindaian
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation();

                    openFilePicker();
                  }}
                >
                  <ImagePlus className="h-4 w-4" />
                  Telusuri file
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation();

                    handleLocalReset();
                  }}
                >
                  <X className="h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ) : error ? (
            <div className="w-full max-w-xl space-y-4">
              <div
                className="
                  flex flex-col items-center gap-4
                "
              >
                <div
                  className="
                    flex h-16 w-16 items-center
                    justify-center rounded-2xl
                    bg-danger/10 text-danger
                  "
                >
                  <AlertCircle className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <p
                    className="
                      text-base font-semibold
                      text-textPrimary
                    "
                  >
                    Unggahan gagal
                  </p>

                  <p className="text-sm text-textSecondary">{error}</p>
                </div>
              </div>

              <div
                className="
                  flex flex-col gap-3
                  sm:flex-row
                  sm:justify-center
                "
              >
                <Button
                  type="button"
                  variant="default"
                  className="w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation();

                    openFilePicker();
                  }}
                >
                  <UploadCloud className="h-4 w-4" />
                  Coba lagi
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center max-w-xl space-y-5">
              <div
                className="
                  flex h-16 w-16 items-center
                  justify-center rounded-2xl
                  bg-primary/10 text-primary
                "
              >
                <UploadCloud className="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <h3
                  className="
                    text-xl font-semibold
                    text-textPrimary
                  "
                >
                  Tarik gambar makananmu ke sini
                </h3>

                <p className="text-sm text-textSecondary">atau klik untuk menelusuri file, lalu mulai pemindaian untuk melihat analisis nutrisi.</p>
              </div>

              <div className="gap-3 grid sm:grid-cols-2">
                <Button
                  type="button"
                  variant="default"
                  onClick={(event) => {
                    event.stopPropagation();

                    openFilePicker();
                  }}
                >
                  <UploadCloud className="h-4 w-4" />
                  Unggah gambar
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={(event) => {
                    event.stopPropagation();

                    openFilePicker();
                  }}
                >
                  <ImagePlus className="h-4 w-4" />
                  Telusuri file
                </Button>
              </div>

              <p className="text-xs text-textMuted">Mendukung format JPG, PNG, dan gambar lainnya hingga {MAX_FILE_SIZE_MB} MB.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
