import { OCR_API_KEY as API_KEY } from "@env";

const processOCR = async (img) => {
  const response = await fetch(
    `https://ocr-text-extractor.p.rapidapi.com/detect-text-from-image-file`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "string",
        "X-RapidAPI-Host": "ocr-text-extractor.p.rapidapi.com",
        "X-RapidAPI-Key": `${API_KEY}`,
      },
      body: `{"ImageContentInBase64":${img}}`,
    }
  );
  const res = await response.json();
  console.log(res.parsedResults[0].parsedText); //res.parsedResults[0].parsedText
};
export default processOCR;
