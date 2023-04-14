export const checkMarineMaxAccount = (value: string) => {
  return Boolean(value && value.toLowerCase().indexOf('@marinemax.com') !== -1);
};
