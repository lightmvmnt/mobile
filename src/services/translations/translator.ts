import geo from "./geo";

export interface Translator {
  [key: string]: {
    [key: string]: string;
  };
}

const t = (
  translate: string,
  changeWords: { [key: string]: string } | null = null,
) => {
  if (!translate) return "";
  const translator = geo.translation as Translator;

  try {
    const words = translate.split(".");
    if (words.length === 2) {
      let result = translator[words[0]][words[1]];
      if (changeWords) {
        Object.keys(changeWords).map((key) => {
          var regex = new RegExp(`{{${key}}}`, "g");
          result = result.replace(regex, changeWords[key]);
        });
      }
      return result;
    }
  } catch (e) {}

  return translate;
};

export default t;
