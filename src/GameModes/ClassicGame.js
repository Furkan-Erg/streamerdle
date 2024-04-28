import React, { useEffect, useState } from "react";
import { Send } from "@mui/icons-material";
import SelectComponent from "../SelectComponent";
import { streamerList } from "../StreamerData";

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
      setguessHistory((prev) => [...prev, selectedStreamerInfo]);
    }

    setSelectedStreamer("");
  };

  useEffect(() => {
    const selectedStreamerInfo = streamerList.find((streamer) =>
      selectedStreamer.includes(streamer.name)
    );
    setSelectedStreamerInfo(selectedStreamerInfo);
  }, [selectedStreamer]);

  return (
    <div className="flex  justify-center items-center flex-col gap-6 h-dvh content-center ">
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 ">
          {informationNames.map((name) => (
            <div className="  text-bold text-center w-20 h-8 border-b-2  border-black ">
              {name}
            </div>
          ))}
        </div>
        {guessHistory.map((streamer) => (
          <div className="flex flex-row gap-1">
            {Object.values(streamer).map(
              (value) =>
                value !== streamer.img && (
                  <div className="bg-blue-900 border-4 border-black text-white text-sm font-semibold rounded-lg  text-center w-20 h-20 flex justify-center items-center">
                    {value === streamer.category ? value.join(", ") : value}
                  </div>
                )
            )}
          </div>
        ))}

        {correctAnswer.name}
      </div>
    </div>
  );
}

export default ClassicGame;
