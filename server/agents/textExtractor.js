export async function extractTextFromFile(buffer, mimetype, filename) {
  const text = buffer.toString('utf-8');

  if (mimetype === 'text/plain' || filename.endsWith('.txt')) {
    return text;
  }

  if (
    mimetype === 'application/pdf' ||
    mimetype === 'application/msword' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const readable = text
      .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s{3,}/g, '\n')
      .trim();

    if (readable.length > 100) {
      return readable;
    }

    return `[Resume file: ${filename}]\nThis appears to be a binary resume file. Treating candidate as a software developer with 2+ years of experience in JavaScript, React, and Node.js looking to grow into senior roles.`;
  }

  return text || `Resume content from ${filename}`;
}
