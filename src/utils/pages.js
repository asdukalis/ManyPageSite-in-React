export const getPageCount = (totalCount, limit) => {
  const total = Number(totalCount);
  const lim = Number(limit);
  if (!total || !lim) return 0;
  return Math.ceil(total / lim);
};

export const getPageArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  // console.log(totalPages, 'getPageArray result:', result);
  return result;
};
