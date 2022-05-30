import * as Localization from "expo-localization";
import i18n from "i18n-js";
import React, { createContext, useEffect, useState } from "react";

import { enData } from "../data/en-GB";
import { roData } from "../data/ro-RO";

i18n.translations = {
  "en-GB": enData,
  "ro-RO": roData,
};

i18n.locale = Localization.locale;
i18n.fallBack = true;

export const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [I18n, setI18n] = useState({});

  useEffect(() => {
    setI18n(i18n);

    return () => setI18n({});
  }, []);

  return (
    <I18nContext.Provider
      value={{
        I18n,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
