"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import PersonalInfoForm from "./component/PersonForm";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";


const PersonTable = dynamic(() => import('./component/PersonTable'), { ssr: false });

const Home: React.FC = () => {
  const { t } = useTranslation(); 
  const router = useRouter();
  const goToHome = () => {
    router.push("/"); 
  };

  return (
    <Provider store={store}>
      <div >
        <h1 style={{padding: "10px"}}>{t("layout.title3")}</h1>
        <button style={{padding: "10px", position: "absolute", right: "10px", border: "none", borderRadius: "5px", cursor: "pointer"}} onClick={goToHome}>{t("layout.back")}</button>
        <PersonalInfoForm />
        <PersonTable />
      </div>
    </Provider>
  );
};

export default Home;
