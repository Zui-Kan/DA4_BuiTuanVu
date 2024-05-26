import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Slider from "../Components/Slider";
import HomeIndex from "../Components/HomeIndex";
import Footer from "../Components/Footer";
import { Loading } from "../Components/Loading/Loading";
import {
  getHangXe,
  getModelMoi,
  getTopXeBanChay,
} from "../services/home.service";

const Home = function () {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, setData] = useState(null);

  async function loadData() {
    const [hangXe, modelMoi, topXeBanChay] = await Promise.all([
      getHangXe(),
      getModelMoi(),
      getTopXeBanChay(),
    ]);
    setData({ hangXe, modelMoi, topXeBanChay });
    setIsDataLoaded(true);
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!isDataLoaded) {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <Slider />
      <HomeIndex data={data} />
      <Footer />
    </>
  );
};

export default Home;
