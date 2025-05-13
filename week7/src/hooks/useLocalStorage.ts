export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      const valueToStore =
          typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      // JSON 파싱 실패 시 원본 문자열 반환
      return localStorage.getItem(key);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem, removeItem };
};