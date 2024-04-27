const BlurImage = ({ imageSrc }) => {
  const blurTiles = (
    <div className="grid grid-cols-4 grid-rows-4 w-96 h-96">
      {[...Array(16)].map((_, index) => (
        <div key={index} className="grid grid-cols-4 grid-rows-4">
          {[...Array(16)].map((_, findex) => (
            <div
              key={index * 16 + findex}
              className=" backdrop-blur-3xl w-6 h-6"
            >
              {index * 16 + (findex + 1)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  //unblur the image
  const unBlur = () => {
    const blurTiles = document.querySelectorAll(".backdrop-blur-3xl");
    blurTiles.forEach((tile) => {
      tile.classList.remove("backdrop-blur-3xl");
    });
  };
  // i need a function that unblurs only the one cell
  const unBlurCell = () => {
    // unblur the cells beetwen index*10 and index*10+10
    const givenIndex = 5;
    const blurTiles = document.querySelectorAll(".backdrop-blur-3xl");
    blurTiles.forEach((tile, index) => {
      if (index > givenIndex * 16 - 1 && index < (givenIndex + 1) * 16) {
        tile.classList.remove("backdrop-blur-3xl");
      }
    });
  };
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className={`bg-cover bg-center bg-no-repeat`}
      >
        {blurTiles}
        <div />
      </div>
      <button onClick={unBlurCell}>Unblur</button>
    </div>
  );
};

export default BlurImage;
