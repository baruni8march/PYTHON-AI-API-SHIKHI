export const textByLanguage = (item, key, language) => {
  const selectedField = `${key}_${language}`;

  return (
    item?.[selectedField] ||
    item?.[`${key}_en`] ||
    item?.[`${key}_bn`] ||
    ""
  );
};