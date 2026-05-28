import { useState, useRef, useEffect } from 'react';
import { predictAPI } from '../services/api';

const MAX_FILE_SIZE_MB = 10;

function isImageFile(file) {
  return Boolean(file?.type?.startsWith('image/'));
}

export function useImagePredict() {
  const [status, setStatus] = useState('idle');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  const dragCounterRef = useRef(0);

  useEffect(() => {
    if (!file || !isImageFile(file)) {
      setPreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const resetDragState = () => {
    dragCounterRef.current = 0;
  };

  const validateAndSetFile = (nextFile) => {
    if (!nextFile) return;

    if (!isImageFile(nextFile)) {
      setError('Please upload a valid image file (JPG, PNG, etc).');
      setStatus('idle');
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
      setStatus('idle');
      return;
    }

    setError('');
    setStatus('idle');
    setFile(nextFile);
    setPredictionResult(null);
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl('');
    setError('');
    setStatus('idle');
    setPredictionResult(null);
    resetDragState();
  };

  const handleScan = async () => {
    if (!file || status === 'processing' || status === 'uploading') {
      return;
    }

    setError('');
    setStatus('processing');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await predictAPI.predict(formData);

      setPredictionResult(response.data || response);
      setStatus('success');
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to analyze the image. Please try again.');
      setStatus('idle');
    }
  };

  return {
    status,
    setStatus,
    file,
    previewUrl,
    error,
    predictionResult,
    dragCounterRef,
    validateAndSetFile,
    handleReset,
    handleScan,
    resetDragState,
  };
}
