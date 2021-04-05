const getData = async (url: string) => {
  const data = await fetch(url);
  return data.json();
};

export default getData;

// Позже отрефакторим этот метод. Добавим эндпоинты, опциональный номер страницы и тд
