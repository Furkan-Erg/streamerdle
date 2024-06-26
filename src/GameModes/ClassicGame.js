import React, { useEffect, useState } from "react";
import { Send, HelpOutline } from "@mui/icons-material";
import SelectComponent from "../SelectComponent";
import { streamerList } from "../StreamerData";
import { Button, Tooltip } from "@mui/material";
import upArrow from "../assets/upArrow.png";
import downArrow from "../assets/downArrow.png";
import { useKeys } from "rooks";
import { GameStates } from "./SplashGame";
import ConfettiComponent from "../Components/ConfettiComponent";

function ClassicGame() {
  const informationNames = [
    "İsim",
    "Cinsiyet",
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
  const [streamers, setStreamers] = useState(streamerList);
  const [gameState, setGameState] = useState(GameStates.PLAYING);

  const handleSelectionChange = (value) => {
    setSelectedStreamer(value);
  };

  const handleGuess = () => {
    if (selectedStreamer === "") return;
    if (selectedStreamer.includes(correctAnswer.name)) {
      setGameState(GameStates.WIN);
    } else {
    }
    setguessHistory((prev) => [...prev, selectedStreamerInfo]);
    setStreamers((prev) =>
      prev.filter((streamer) => streamer.name !== selectedStreamerInfo.name)
    );
    setSelectedStreamer("");
  };
  const handleNextGame = () => {
    setCorrectAnswer(
      streamerList[Math.floor(Math.random() * streamerList.length)]
    );
    setguessHistory([]);
    setGameState(GameStates.PLAYING);
    setStreamers(streamerList);
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
    <div className="flex   justify-center items-center flex-col  h-dvh content-center ">
      {gameState === GameStates.PLAYING && (
        <div className="flex justify-center items-center flex-col gap-6">
          <div className={guessHistory.length > 0 ? "hidden xr:flex" : ""}>
            <div className="bg-blue-900 border-4 border-black text-white text-sm md:text-xl text-bold rounded-lg py-4 px-8 text-center   ">
              <div>Bugünün influencer'ı kim?</div>
              <div className="opacity-50 ">
                Başlamak için herhangi bir influencer adı yaz.
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SelectComponent
              optionsArray={streamers}
              onSelectionChange={handleSelectionChange}
              selectedValue={selectedStreamer}
            />
            <button
              onClick={handleGuess}
              className="bg-blue-900 border-4 border-black p-4 rounded-full text-white"
            >
              <Send fontSize="medium" className="ml-1" />
            </button>
          </div>
          <div className={guessHistory.length > 0 ? "" : "hidden xr:flex"}>
            <div className="flex flex-row md:flex-col gap-2  w-[23rem] md:w-auto md:h-[36rem] overflow-x-auto md:overflow-y-auto ">
              <div className="flex flex-col md:flex-row gap-1 md:gap-4 ">
                {informationNames.map((name) => (
                  <div className=" text-white text-bold flex items-center justify-center text-center w-20 h-20 md:h-8 border-2 md:border-0 md:border-b-2  border-white ">
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
              <div className=" flex flex-row-reverse md:flex-col-reverse  gap-1">
                {guessHistory.map((streamer, index) => (
                  <div
                    key={index}
                    className="mb-0 md:mb-4  flex flex-col justify-between  py-1  md:flex-row mx-[0.65rem] md:mx-0 gap-[0.60rem] md:gap-1 text-white text-sm font-semibold text-center"
                  >
                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
                      <div className="flip-1 bg-blue-900 w-full h-full flex justify-center items-center">
                        {streamer.name}
                      </div>
                    </div>
                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
                      <div
                        className={`${
                          correctAnswer.gender === streamer.gender
                            ? "bg-green-600"
                            : "bg-red-600"
                        } flip-2 w-full h-full flex justify-center items-center`}
                      >
                        {streamer.gender}
                      </div>
                    </div>
                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
                      <div
                        className={`${
                          correctAnswer.nickName
                            ? streamer.nickName
                              ? "bg-green-600"
                              : "bg-red-600"
                            : streamer.nickName
                            ? "bg-red-600"
                            : "bg-green-600"
                        } flip-3 w-full h-full flex justify-center items-center`}
                      >
                        {streamer.nickName ? "Var" : "Yok"}
                      </div>
                    </div>

                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
                      <div
                        className={`${
                          correctAnswer.followerCount === streamer.followerCount
                            ? "bg-green-600"
                            : "bg-red-600"
                        } flip-4 w-full h-full flex justify-center items-center`}
                      >
                        {streamer.followerCount ===
                        correctAnswer.followerCount ? (
                          formatNumber(streamer.followerCount)
                        ) : (
                          <div
                            style={{
                              backgroundImage: `url(${
                                correctAnswer.followerCount >
                                streamer.followerCount
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
                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
                      <div
                        className={`${
                          correctAnswer.birthYear === streamer.birthYear
                            ? "bg-green-600"
                            : "bg-red-600"
                        } flip-5 w-full h-full flex justify-center items-center `}
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
                    <div className="border-4 border-black rounded-lg w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 overflow-hidden">
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
                        } flip-6  w-full h-full flex justify-center items-center `}
                      >
                        {streamer.category.join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {gameState === GameStates.WIN && (
        <div className="self-center flex justify-center items-center">
          <ConfettiComponent />
          <Button onClick={handleNextGame} variant="contained">
            Yeniden Oyna
          </Button>
        </div>
      )}
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
