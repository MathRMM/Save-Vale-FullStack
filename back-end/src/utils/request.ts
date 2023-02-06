async function get(url: string) {
  const result = await fetch(url, { method: "GET" });
  return result;
}

export const request = {
  get,
};
