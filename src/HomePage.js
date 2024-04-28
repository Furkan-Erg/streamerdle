import React from "react";

function HomePage() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-xl font-bold text-white">
          Ünlü Türk Influencer'ları tahmin et!
        </div>

        <div className="flex flex-col gap-4">
          <CustomButton
            title={"Klasik"}
            description={"Her denemede ipucu al"}
            url={"/classic"}
          />
          <CustomButton
            title={"Görsel"}
            description={"Görseli tahmin et"}
            url={"/splash"}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
const CustomButton = ({ title, description, url }) => {
  return (
    <a href={url}>
      <div className="px-16 py-2 shadow-lg shadow-shadow bg-blue-900 border-4 border-black rounded-xl border-  text-white">
        <div className="text-xl font-bold">{title}</div>
        <div>{description}</div>
      </div>
    </a>
  );
};
