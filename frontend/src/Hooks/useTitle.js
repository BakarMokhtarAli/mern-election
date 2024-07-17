import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Election`;
  }, [title]);

  return title;
};
