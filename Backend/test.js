import { getCertificatePdf } from "./src/utils/certificateGenerator.js";

try {
  await getCertificatePdf({studentName:'khushi',issueDate:'26',courseName:'mern'})
  console.log('DONE')
} catch (error) {
  console.error('PDF ERROR:', error)
}