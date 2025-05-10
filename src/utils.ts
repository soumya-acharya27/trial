import { ToastAndroid, Platform } from "react-native";
import { Post } from "./interface/clubinterface";
import FastImage from "react-native-fast-image";
import { Image } from 'react-native-compressor';
import { logger } from './utils/logger';
import RNFS from 'react-native-fs';

export const fullNameRegex = new RegExp('^[a-zA-Z ]*$');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//one uppercase, one number and 8+characters
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => passwordRegex.test(password);

export const otpResendTimeinSecs = 30
export const paginationLimit = 15

export const errorMessage = 'Something went wrong, try again later'

export const showErrorToast = (msg: string) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};

export const DOCUMENT_TYPE = {
  MARKSHEET: 'MARKSHEET',
  ID_CARD: 'ID_CARD',
  FEE_RECIPT: 'FEE_RECIPT',
} as const;

export const compressImage = async (uri: string, maxSizeKB: number = 500, quality: number = 0.7): Promise<string> => {
  try {

    // Compress image with react-native-compressor
    const compressedImage = await Image.compress(uri, {
      maxWidth: 1000,
      maxHeight: 1000,
      quality: quality,
      compressionMethod: 'auto',
    });

    // Check file size
    const response = await fetch(compressedImage);
    const blob = await response.blob();
    const sizeInKB = blob.size / 1024;

    if (sizeInKB > maxSizeKB) {
      // If still too large, reduce quality and compress again
      const newQuality = quality * 0.7; // Reduce quality by 30%
      if (newQuality < 0.1) {
        // If quality is too low, return the last compressed version
        return compressedImage;
      }
      return compressImage(compressedImage, maxSizeKB, newQuality);
    }

    return compressedImage;
  } catch (error) {
    console.error("111", 'Error compressing image:', error);
    return uri; // Return original URI if compression fails
  }
};

export const uploadFileToS3 = async (uploadUrl: string, file: { uri: string, type: string, name: string }) => {
  try {
    logger.debug("Starting file upload", { file });

    // Compress image if it's an image file
    let finalUri = file.uri;
    const isImage = file.type?.toLowerCase().includes('image/') ||
      file.name?.toLowerCase().endsWith('.jpg') ||
      file.name?.toLowerCase().endsWith('.jpeg') ||
      file.name?.toLowerCase().endsWith('.png') ||
      file.name?.toLowerCase().endsWith('.heic') ||
      file.name?.toLowerCase().endsWith('.heif');

    if (isImage) {
      logger.debug("Detected image file, compressing...");
      finalUri = await compressImage(file.uri);
    }

    const response = await fetch(finalUri);
    const blob = await response.blob();
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status: ${uploadResponse.status}`);
    }

    logger.debug('File uploaded successfully');
    return true;
  } catch (error) {
    logger.error('Error uploading file:', error);
    throw error;
  }
};
export const uploadPDFtoS3 = async (
  uploadUrl: string,
  file: { uri: string; type: string; name: string }
) => {
  try {
    logger.debug("Starting PDF upload", { uploadUrl, file });
    let filePath = file.uri;

    logger.debug('Resolved file path:', filePath);

    let base64Data: string | null = null;
    if (file.uri.startsWith('content://')) {
      try {
        base64Data = await RNFS.readFile(filePath, 'base64');
        logger.debug('File data (base64 for content://):', base64Data ? base64Data.slice(0, 20) + '...' : null);
      } catch (readError) {
        logger.error('Error reading content URI:', readError);
        throw readError;
      }
    } else {
      base64Data = await RNFS.readFile(filePath, 'base64');
      logger.debug('File data (base64 for file path):', base64Data ? base64Data.slice(0, 20) + '...' : null);
    }

    if (!base64Data) {
      throw new Error('Failed to read file data.');
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      body: base64Data,
      headers: {
        'Content-Type': file.type,
        'Content-Encoding': 'base64', // Explicitly tell S3 it's base64 encoded
      },
    });
    logger.debug('uploadResponse', uploadResponse);

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      logger.error(`Upload failed with status: ${uploadResponse.status} - ${errorText}`);
      throw new Error(`Upload failed with status: ${uploadResponse.status} - ${errorText}`);
    }

    logger.debug('PDF uploaded successfully');
    return true;
  } catch (error) {
    logger.error('Error uploading PDF:', error);
    throw error;
  }
};
export const isValidImageUrl = (url?: string) => {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

// Function to preload a batch of images
export const preloadImageBatch = (posts: Post[], startIndex: number, batchSize = 5) => {
  const imagesToPreload = [];

  for (let i = startIndex; i < startIndex + batchSize && i < posts.length; i++) {
    const post = posts[i];
    if (post?.user?.profilePicId) {
      isValidImageUrl(post.user.profilePicId) && imagesToPreload.push({ uri: post.user.profilePicId });
    }
    if (post?.images?.[0]) {
      isValidImageUrl(post.user.profilePicId) && imagesToPreload.push({ uri: post.images[0] });
    }
  }

  if (imagesToPreload.length > 0) {
    FastImage.preload(imagesToPreload);
  }
};

export const getDummyProfile = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
};

export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { label: 'y', seconds: 60 * 60 * 24 * 365 }, // 1 year
    { label: 'w', seconds: 60 * 60 * 24 * 7 },   // 1 week
    { label: 'd', seconds: 60 * 60 * 24 },       // 1 day
    { label: 'h', seconds: 60 * 60 },            // 1 hour
    { label: 'm', seconds: 60 }                  // 1 minute
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) return `${value}${unit.label}`;
  }

  return 'just now';
}