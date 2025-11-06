export const formatDoughName = (dough: string): string => {
  const doughNames: Record<string, string> = {
    'baunilha': 'Baunilha',
    'chocolate': 'Chocolate',
    'red-velvet': 'Red Velvet'
  };
  return doughNames[dough] || dough;
};

export const formatFillingName = (filling: string): string => {
  const fillingNames: Record<string, string> = {
    'nutella': 'Nutella',
    'ninho': 'Ninho',
    'maracuja': 'Maracujá',
    'beijinho': 'Beijinho',
    'doce-de-leite': 'Doce de Leite'
  };
  return fillingNames[filling] || filling;
};
