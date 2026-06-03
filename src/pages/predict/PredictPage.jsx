import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UploadSection } from '../../components/predict/UploadSection';
import { CameraSection } from '../../components/predict/CameraSection';
import { useImagePredict } from '../../hooks/useImagePredict';
import { PageHeader } from '../../components/layout/PageHeader';
import PredictionResult from '../../components/predict/PredictionResult';
import { Camera, UploadCloud } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { fadeUp } from '../../utils/animation.js';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { MealFormModal } from '../../components/meals/MealFormModal';

export default function PredictPage() {
  useDocumentTitle('Scan AI');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [addFromPredict, setAddFromPredict] = useState(null);

  const predictHook = useImagePredict();
  const { predictionResult } = predictHook;

  const switchTab = (tab) => {
    if (tab !== activeTab) {
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
        <PageHeader
          title="Pemindai Makanan"
          description="Pindai makanan untuk mengetahui kandungan nutrisinya."
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="flex justify-center w-full">
        <div className="bg-surface2 p-1.5 rounded-2xl grid grid-cols-2 border border-borderPrimary shadow-sm max-w-md w-full">
          <Button
            onClick={() => switchTab('upload')}
            variant={activeTab === 'upload' ? 'outline' : 'ghost'}
          >
            <UploadCloud className="w-4 h-4 mr-2" /> Unggah File
          </Button>
          <Button
            variant={activeTab === 'camera' ? 'outline' : 'ghost'}
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
        <PredictionResult 
          predictionResult={predictionResult} 
          onAdd={(data) => setAddFromPredict(data)} 
        />
      )}

      <MealFormModal
        open={Boolean(addFromPredict)}
        initialData={addFromPredict}
        onClose={() => setAddFromPredict(null)}
        onSuccess={() => {
          setAddFromPredict(null);
          navigate('/meals');
        }}
      />
    </motion.div>
  );
}