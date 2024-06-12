import { createWorker } from "tesseract.js";
const convertor = async (imgUrl) => {
  const worker = await createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(imgUrl);
  // console.log(text);
  await worker.terminate();
  return text;
};
export default convertor;