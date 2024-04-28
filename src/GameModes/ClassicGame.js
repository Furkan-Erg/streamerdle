import React, { useEffect, useState } from "react";
import { Send, HelpOutline } from "@mui/icons-material";
import SelectComponent from "../SelectComponent";
import { streamerList } from "../StreamerData";
import { IconButton, Tooltip } from "@mui/material";
import upArrow from "../assets/upArrow.png";
import downArrow from "../assets/downArrow.png";
import { useKeys } from "rooks";

function ClassicGame() {
  const informationNames = [
    "İsim",
    "Mahlas",
    "Takipçi",
    "Doğum Yılı",
    "Kategori",
  ];
  const [selectedStreamer, setSelectedStreamer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(
    streamerList[Math.floor(Math.random() * streamerList.length)]
  );
  const [guessHistory, setguessHistory] = useState([]);
  const [selectedStreamerInfo, setSelectedStreamerInfo] = useState({
    name: "",
    follower: "",
    birth: "",
    category: "",
    img: "",
  });

  const handleSelectionChange = (value) => {
    setSelectedStreamer(value);
  };

  const handleGuess = () => {
    if (selectedStreamer.includes(correctAnswer.name)) {
    } else {
    }
    setguessHistory((prev) => [...prev, selectedStreamerInfo]);

    setSelectedStreamer("");
  };
  useKeys(["KeyQ", "KeyW", "KeyE"], () => {
    alert(correctAnswer.name);
  });

  useEffect(() => {
    const selectedStreamerInfo = streamerList.find((streamer) =>
      selectedStreamer.includes(streamer.name)
    );
    setSelectedStreamerInfo(selectedStreamerInfo);
  }, [selectedStreamer]);

  return (
    <div className="flex   justify-center items-center flex-col gap-6 h-dvh content-center ">
      <div className="bg-blue-900 border-4 border-black text-white text-xl text-bold rounded-lg py-4 px-8 text-center">
        <div>Bugünün influencer'ı kim?</div>
        <div className="opacity-50 ">
          Başlamak için herhangi bir influencer adı yaz.
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <SelectComponent
          optionsArray={streamerList}
          onSelectionChange={handleSelectionChange}
          selectedValue={selectedStreamer}
          width="w-96"
        />
        <button
          onClick={handleGuess}
          className="bg-blue-900 border-4 border-black p-4 rounded-full text-white"
        >
          <Send fontSize="medium" className="ml-1" />
        </button>
      </div>
      <div className="flex flex-col gap-2 h-24">
        <div className="flex flex-row gap-1 ">
          {informationNames.map((name) => (
            <div className=" text-white text-bold text-center w-20 h-8 border-b-2  border-white ">
              {name}
              {name === "Mahlas" && (
                <span className="cursor-pointer ml-1">
                  <Tooltip title="Influencer'ın Mahlas (Nick name) i var mı?">
                    <HelpOutline />
                  </Tooltip>
                </span>
              )}
            </div>
          ))}
        </div>
        <div className=" flex flex-col-reverse gap-1">
          {guessHistory.map((streamer, index) => (
            <div
              key={index}
              className="mb-4  flex flex-row gap-1 text-white text-sm font-semibold text-center"
            >
              <div className="border-4 border-black rounded-lg w-20 h-20 overflow-hidden">
                <div className="flip-1 bg-blue-900 w-full h-full flex justify-center items-center">
                  {streamer.name}
                </div>
              </div>
              <div className="border-4 border-black rounded-lg w-20 h-20 overflow-hidden">
                <div
                  className={`${
                    correctAnswer.nickName
                      ? streamer.nickName
                        ? "bg-green-600"
                        : "bg-red-600"
                      : streamer.nickName
                      ? "bg-red-600"
                      : "bg-green-600"
                  } flip-2 w-full h-full flex justify-center items-center`}
                >
                  {streamer.nickName ? "Var" : "Yok"}
                </div>
              </div>

              <div className="border-4 border-black rounded-lg w-20 h-20 overflow-hidden">
                <div
                  className={`${
                    correctAnswer.followerCount === streamer.followerCount
                      ? "bg-green-600"
                      : "bg-red-600"
                  } flip-3 w-full h-full flex justify-center items-center`}
                >
                  {streamer.followerCount === correctAnswer.followerCount ? (
                    formatNumber(streamer.followerCount)
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url(${
                          correctAnswer.followerCount > streamer.followerCount
                            ? upArrow
                            : downArrow
                        })`,
                      }}
                      className={`bg-cover bg-center bg-no-repeat w-16 h-16 flex justify-center items-center`}
                    >
                      {formatNumber(streamer.followerCount)}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-4 border-black rounded-lg w-20 h-20 overflow-hidden">
                <div
                  className={`${
                    correctAnswer.birthYear === streamer.birthYear
                      ? "bg-green-600"
                      : "bg-red-600"
                  } flip-4 w-full h-full flex justify-center items-center `}
                >
                  {streamer.birthYear === correctAnswer.birthYear ? (
                    streamer.birthYear
                  ) : (
                    <div
                      style={{
                        backgroundImage: `url(${
                          correctAnswer.birthYear > streamer.birthYear
                            ? upArrow
                            : downArrow
                        })`,
                      }}
                      className={`bg-cover bg-center bg-no-repeat w-16 h-16 flex justify-center items-center`}
                    >
                      {streamer.birthYear}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-4 border-black rounded-lg w-20 h-20 overflow-hidden">
                <div
                  className={`${
                    correctAnswer.category.toString() ===
                    streamer.category.toString()
                      ? "bg-green-600"
                      : streamer.category.some((category) =>
                          correctAnswer.category.includes(category)
                        )
                      ? "bg-orange-600"
                      : "bg-red-600"
                  } flip-5  w-full h-full flex justify-center items-center `}
                >
                  {streamer.category.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* {correctAnswer.name} */}
      </div>
    </div>
  );
}
function formatNumber(num) {
  var suffixes = ["", "k", "m", "b", "t"];

  if (num >= 1000) {
    var suffixIndex = Math.floor(Math.log10(num) / 3);
    var shortNum = (num / Math.pow(10, suffixIndex * 3)).toFixed(1);
    return shortNum + suffixes[suffixIndex];
  }
  return num.toString();
}

export default ClassicGame;
