import React, { useState } from 'react';
import { UploadSection } from '../../components/predict/UploadSection';
import { CameraSection } from '../../components/predict/CameraSection';
import { useImagePredict } from '../../hooks/useImagePredict';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import PredictionResult from '../../components/predict/PredictionResult';
import { Camera, UploadCloud } from 'lucide-react';

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
        title="Food Image AI"
        description="Upload or capture a photo of your meal to instantly estimate its nutritional values."
      />

      <div className="flex justify-center w-full">
        <div className="bg-surface2 p-1.5 rounded-2xl flex border border-borderPrimary shadow-sm max-w-md w-full">
          <button
            onClick={() => switchTab('upload')}
            className={`flex-1 flex justify-center items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'upload' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-textSecondary hover:text-textPrimary hover:bg-input'}`}
          >
            <UploadCloud className="w-4 h-4 mr-2" /> Upload File
          </button>
          <button
            onClick={() => switchTab('camera')}
            className={`flex-1 flex justify-center items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'camera' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-textSecondary hover:text-textPrimary hover:bg-input'}`}
          >
            <Camera className="w-4 h-4 mr-2" /> Camera Capture
          </button>
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