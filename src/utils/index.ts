export const isNullOrEmpty = (data: any | any[]): boolean => {
  if (!data) {
    return true;
  }
  if (data instanceof Array) {
    return data.length === 0;
  }
  if (typeof data === 'number') {
    return data === 0;
  }
  if (typeof data === 'undefined') {
    return true;
  }
  if (typeof data === 'object') {
    return Object.keys(data).length === 0;
  }
  let output = data;
  if (typeof output !== 'string') {
    output = output.toString();
  }
  output = output.trim();

  return output.length <= 0;
};

export const shuffle = <T>(array: T[]): T[] => {
  let newArray = array.slice();
  let currentIndex = newArray.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
};
