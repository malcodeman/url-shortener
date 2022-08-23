const getUrlHost = (url: string) => {
  try {
    const parsed = new URL(url);
    return `${parsed.host}${parsed.pathname}`;
  } catch {
    return "";
  }
};

const EXPORTS = {
  getUrlHost,
};

export default EXPORTS;
