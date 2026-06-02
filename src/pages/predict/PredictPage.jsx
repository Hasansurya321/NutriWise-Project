import React, { useState } from 'react';
import { UploadSection } from '../../components/predict/UploadSection';
import { CameraSection } from '../../components/predict/CameraSection';
import { useImagePredict } from '../../hooks/useImagePredict';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import PredictionResult from '../../components/predict/PredictionResult';
import { Camera, UploadCloud } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function PredictPage() {
  // upload or camera
  const [activeTab, setActiveTab] = useState('upload');

  const predictHook = useImagePredict();
  const { predictionResult, handleReset } = predictHook;

  const switchTab = (tab) => {
    if (tab !== activeTab) {
      handleReset();
      setActiveTab(tab);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <SectionHeader
        title="AI Pemindai Makanan"
        description="Unggah atau ambil foto makananmu untuk mendeteksi nilai nutrisinya secara langsung."
      />

      <div className="flex justify-center w-full">
        <div className="bg-surface2 p-1.5 rounded-2xl grid grid-cols-2 border border-borderPrimary shadow-sm max-w-md w-full">
          <Button
            onClick={() => switchTab('upload')}
            variant={activeTab === 'upload' ? 'default' : 'ghost'}
          >
            <UploadCloud className="w-4 h-4 mr-2" /> Unggah File
          </Button>
          <Button
            variant={activeTab === 'camera' ? 'default' : 'ghost'}
            onClick={() => switchTab('camera')}
          >
            <Camera className="w-4 h-4 mr-2" /> Kamera
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {activeTab === 'upload' ? (
          <UploadSection {...predictHook} />
        ) : (
          <CameraSection {...predictHook} />
        )}
      </div>

      {predictionResult && (
        <PredictionResult predictionResult={predictionResult} />
      )}
    </div>
  );
}