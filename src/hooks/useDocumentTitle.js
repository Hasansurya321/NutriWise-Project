import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `NutriCitra | ${title}` : 'NutriCitra';
  }, [title]);
}
