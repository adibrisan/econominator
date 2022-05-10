import { GOOGLE_API_KEY as API_KEY } from "@env";

const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
function generateImageBody(img) {
  const imgBody = {
    requests: [
      {
        image: {
          content: img,
        },
        features: [
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
          },
        ],
      },
    ],
  };
  return imgBody;
}

const processOCR = async (img) => {
  const imgBody = generateImageBody(img);
  // console.log(JSON.stringify(img));
  const response = await fetch(
    `https://ocr-text-extractor.p.rapidapi.com/detect-text-from-image-file`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "string",
        "X-RapidAPI-Host": "ocr-text-extractor.p.rapidapi.com",
        "X-RapidAPI-Key": "3d45611891mshe2d6b60c6096d60p176c68jsn5ef24afd6c2e",
      },
      body: `{"ImageContentInBase64":${img}}`,
    }
  );
  const res = await response.json();
  console.log(res);
};
export default processOCR;
