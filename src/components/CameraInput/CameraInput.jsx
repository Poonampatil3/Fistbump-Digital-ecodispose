import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeImage } from '../../services/geminiService';
import './CameraInput.css';

const CameraInput = ({ onImageCapture, onImageUpload }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1280,
      height: 720,
    });
    setImgSrc(imageSrc);
    setError(null);
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImgSrc(reader.result);
        setError(null);
        await handleAnalysis(reader.result);
      };
      reader.onerror = () => {
        setError('Failed to read image file');
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const processImage = async (imageData) => {
    try {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Resize if needed
          let { width, height } = img;
          const MAX_SIZE = 800;

          if (width > height && width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Get processed image data URL
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = imageData;
      });
    } catch (error) {
      throw new Error('Failed to process image');
    }
  };

  const handleAnalysis = async (imageData) => {
    try {
      setError(null);
      if (!imageData) {
        throw new Error('No image data provided');
      }

      // Process and validate image
      const processedImage = await processImage(imageData);

      if (!processedImage.startsWith('data:image/')) {
        throw new Error('Invalid image format');
      }

      const result = await analyzeImage(processedImage);
      if (onImageCapture) {
        onImageCapture(result);
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    }
  };

  const retake = () => {
    setImgSrc(null);
    setError(null);
  };

  return (
    <div className="camera-input-wrapper">
      <AnimatePresence>
        {!imgSrc ? (
          <motion.div
            className="camera-input-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Webcam live feed */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="camera-webcam"
              videoConstraints={{ facingMode: 'environment' }}
              onUserMediaError={(e) => {
                setError('Camera access denied or unavailable');
                console.error(e);
              }}
            />

            {error && <div className="error-message">⚠️ {error}</div>}

            <div className="camera-controls">
              <button onClick={capture} className="btn btn-capture">
                Capture
              </button>
              <button onClick={triggerFileInput} className="btn btn-upload">
                Upload Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="image-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={imgSrc} alt="Captured" className="preview-img" />
            <div className="preview-actions">
              <button onClick={retake} className="btn btn-secondary">
                Retake
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAnalysis(imgSrc)}
              >
                Analyze
              </button>
            </div>
            {error && <div className="error-message">⚠️ {error}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CameraInput;
