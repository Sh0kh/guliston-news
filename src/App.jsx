import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import './style/Media.css';
import Dashboard from "./Pages/Dashboard";
import Superiors from "./Pages/Superiors";
import News from "./Pages/News";
import NewsItems from "./Pages/NewsItem";
import Contact from "./Pages/Contact";
import AdminNews from "./Components/AdminPages/AdminNews";
import Media from "./Components/AdminPages/Media";
import Person from "./Components/AdminPages/Person";
import Rekvizit from "./Pages/Rekvizit";
import UserRec from "./Pages/UserRec";
import OrgStructure from "./Pages/OrgStructure";
import Menu from "./Components/AdminPages/Menu";
import SubMenu from "./Components/AdminPages/SubMenu";
import PageCreate from "./Components/AdminPages/PageCreate";
import SubMenuData from "./Components/AdminPages/SubMenuData";
import PageEdit from "./Components/AdminPages/PageEdit";
import Page from "./Pages/Page";
import Statistics from "./Components/AdminPages/Statistics";
import ErrorPage from "./Pages/ErrorPage";
import Koruption from "./Pages/Koruption";
import OpenData from "./Pages/OpenData";
import ApparatWorkers from "./Pages/ApparatWorkers";
import AdminOpenData from "./Components/AdminPages/AdminOpenData";
import AdminKoruption from "./Components/AdminPages/AdminKoruption";
import AdminNewsCreate from "./Components/AdminPages/AdminNewsCreate";
import AdminNewsEdit from "./Components/AdminPages/AdminNewsEdit";
import PersonCreate from "./Components/AdminPages/PersonCreate";
import PersonEdit from "./Components/AdminPages/PersonEdit";
import PersonInfo from "./Components/AdminPages/PersonInfo";
import SuperiorsDetail from "./Pages/SupDatail";
import WorkerDetail from "./Pages/WorkerDetail";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        {/* Основные SEO-теги */}
        <title>{t('Logo')}</title>
        <meta
          name="description"
          content="Guliston shahrining eng so‘nggi yangiliklari va muhim voqealari. Siyosat, jamiyat, sport, iqtisod va boshqa dolzarb yangiliklar faqat bizda!"
        />
        <meta
          name="keywords"
          content="Guliston yangiliklari, O‘zbekiston yangiliklari, mahalliy xabarlar, so‘nggi yangiliklar, Guliston shahri, sport yangiliklari, siyosat, iqtisod"
        />
        <meta name="author" content="Guliston News" />

        {/* Open Graph для социальных сетей */}
        <meta property="og:title" content="Guliston Yangiliklari – So‘nggi Mahalliy Xabarlar" />
        <meta
          property="og:description"
          content="Guliston shahridagi eng dolzarb yangiliklar va voqealar bilan tanishing!"
        />
        <meta property="og:image" content="URL_ВАШЕЙ_КАРТИНКИ" />
        <meta property="og:url" content="URL_ВАШЕГО_САЙТА" />
        <meta property="og:type" content="website" />

        {/* Адаптивность и кодировка */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Helmet>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="admin/dashboard" element={<Dashboard />} />
              <Route path="admin/news" element={<AdminNews />} />
              <Route path="admin/media" element={<Media />} />
              <Route path="admin/person" element={<Person />} />
              <Route path="admin/menu" element={<Menu />} />
              <Route path="admin/menu/:ID/:name" element={<SubMenu />} />
              <Route path="admin/statistics" element={<Statistics />} />
              <Route path="/admin/create/:ID" element={<PageCreate />} />
              <Route path="/admin/edit/:ID" element={<PageEdit />} />
              <Route path="/admin/page/:ID" element={<SubMenuData />} />
              <Route path="/admin/open-data" element={<AdminOpenData />} />
              <Route path="/admin/koruption" element={<AdminKoruption />} />
              <Route path="/admin/news/create" element={<AdminNewsCreate />} />
              <Route path="/admin/news/edit/:ID" element={<AdminNewsEdit />} />
              <Route path="/admin/person/create" element={<PersonCreate />} />
              <Route path="/admin/person/edit/:ID" element={<PersonEdit />} />
              <Route path="/admin/person/info/:ID" element={<PersonInfo />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/rahbariyat" element={<Superiors />} />
              <Route path="/apparat-xodimlari" element={<ApparatWorkers />} />
              <Route path="/yangiliklar" element={<News />} />
              <Route path="/koruption" element={<Koruption />} />
              <Route path="/ochiq-malumot" element={<OpenData />} />
              <Route path="/rekvizitlar" element={<Rekvizit />} />
              <Route path="/fuqarolarni-qabul-qilish-tartibi" element={<UserRec />} />
              <Route path="/tashkili-tuzilmasi" element={<OrgStructure />} />
              <Route path="/yangiliklar/:id" element={<NewsItems />} />
              <Route path="/boglanish" element={<Contact />} />
              <Route path="/rahbariyat/:id" element={<SuperiorsDetail />} />
              <Route path="/apparat-xodimlar/:id" element={<WorkerDetail />} />
              <Route path="/sahifa/:ID" element={<Page />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
