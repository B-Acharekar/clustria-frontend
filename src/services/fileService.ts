type FileCategory =
  | "DOCUMENTS"
  | "IMAGES"
  | "AUDIO_VIDEO"
  | "COMPRESSED"
  | "CODE_DATA"
  | "UNKNOWN";

const fileTypes = {
  DOCUMENTS: ["docx", "doc", "xlsx", "xls", "pptx", "ppt", "pdf", "txt", "rtf", "odt", "ods", "odp"],
  IMAGES: ["jpg", "jpeg", "png", "gif", "svg", "bmp", "tiff"],
  AUDIO_VIDEO: ["mp4", "mov", "mp3", "wav", "avi", "wmv", "flv", "aac"],
  COMPRESSED: ["zip", "rar", "7z"],
  CODE_DATA: ["html", "css", "js", "py", "java", "c", "cpp", "json", "xml", "csv"],
};

function getFileCategory(extension: string): FileCategory {
  for (const category in fileTypes) {
    if (fileTypes[category as keyof typeof fileTypes].includes(extension)) {
      return category as FileCategory;
    }
  }
  return "UNKNOWN";
}

function isImage(extension: string): boolean {
  return fileTypes.IMAGES.includes(extension);
}

function isPdf(extension: string): boolean {
  return extension === "pdf";
}

function isDocument(extension: string): boolean {
  return fileTypes.DOCUMENTS.includes(extension) && extension !== "pdf" && extension !== "xlsx" && extension !== "xls" && extension !== "pptx" && extension !== "ppt";
}

function isExcel(extension: string): boolean {
  return ["xlsx", "xls"].includes(extension);
}

function isPPT(extension: string): boolean {
  return ["pptx", "ppt"].includes(extension);
}

function isAudio(extension: string): boolean {
  return ["mp3", "wav", "aac"].includes(extension);
}

function isVideo(extension: string): boolean {
  return ["mp4", "mov", "avi", "wmv", "flv"].includes(extension);
}

function isAudioVideo(extension: string): boolean {
  return fileTypes.AUDIO_VIDEO.includes(extension);
}

function isCompressed(extension: string): boolean {
  return fileTypes.COMPRESSED.includes(extension);
}

function isCode(extension: string): boolean {
  return fileTypes.CODE_DATA.includes(extension);
}

export const fileService = {
  getFileCategory,
  isImage,
  isPdf,
  isDocument,
  isExcel,
  isPPT,
  isAudio,
  isVideo,
  isAudioVideo,
  isCompressed,
  isCode,
};
