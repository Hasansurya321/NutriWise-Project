import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadSection } from '../../components/predict/UploadSection';
import { CameraSection } from '../../components/predict/CameraSection';
import { useImagePredict } from '../../hooks/useImagePredict';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import PredictionResult from '../../components/predict/PredictionResult';
import { Camera, UploadCloud } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { fadeUp } from '../../utils/animation.js';

export default function PredictPage() {
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
    <motion.div
      initial="hidden"
      animate="show"
      transition={{
        staggerChildren: 0.06,
      }}
      className="space-y-8 pb-8">
      <motion.div variants={fadeUp}>

        <SectionHeader
          title="AI Pemindai Makanan"
          description="Unggah atau ambil foto makananmu untuk mendeteksi nilai nutrisinya secara langsung."
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex justify-center w-full">
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
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mx-auto w-full">
        {activeTab === 'upload' ? (
          <UploadSection {...predictHook} />
        ) : (
          <CameraSection {...predictHook} />
        )}
      </motion.div>

      {predictionResult && (
        <PredictionResult predictionResult={predictionResult} />
      )}
    </motion.div>
  );
}