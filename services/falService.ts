
/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * MOCKED version of generateProfessionalHeadshot.
 * Simulated Fal.ai behavior to save credits and test the flow.
 */
export const generateProfessionalHeadshot = async (
  base64Image: string,
  style: string
): Promise<string> => {
  
  console.log(`[Mock Service] Generating image with style: ${style}`);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // For simulation, we just return the original image
  // In a real scenario, this would return the URL from Fal.ai
  return base64Image; 
};