// diganta_som -> Diganta Som

const snakeCaseToCapitalizedSentence = (text: string): string => {
  const words: string[] = text.split('_');
  const capitalizedWordsArray: string[] = [];

  words.forEach(element => {
    capitalizedWordsArray.push(
      element[0].toUpperCase() + element.slice(1, element.length),
    );
  });

  let sentence: string = '';
  capitalizedWordsArray.forEach(word => {
    sentence += word + ' ';
  });

  return sentence.trim();
};

export default snakeCaseToCapitalizedSentence;
