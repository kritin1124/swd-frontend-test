"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import {store}  from "./store/store";
import i18n from "./i18nConfig";
import LanguageSwitcher from "./LanguageSwitcher";
import "./layout.css";
import "antd/dist/reset.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <html lang="en">
          <body>
            <LanguageSwitcher />
            {children}
          </body>
        </html>
      </I18nextProvider>
    </Provider>
  );
}