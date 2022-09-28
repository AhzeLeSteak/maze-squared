const create_cipher = (salt: string) => {
  const textToChars = (text: string) => text.split("").map(c => c.charCodeAt(0));
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a, b) => a ^ b, code);
  const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);

  return (text: string) =>
    textToChars(text)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
};

const create_decipher = (salt: string) => {
  const textToChars = (text: string) => text.split("").map(c => c.charCodeAt(0));
  const applySaltToChar = (code: number) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return (encoded: string) => encoded.match(/.{1,2}/g)!
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join("");
};

const key = "super_cypher_key";
export const cipher = create_cipher(key);
export const decipher = create_decipher(key);
