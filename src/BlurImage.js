const BlurImage = ({ imageSrc }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageSrc})` }}
      className={`w-48 h-48  bg-cover bg-center bg-no-repeat`}
    >
      {/* <GridColumn
        gridItem={<GridRow gridItem={<GridColumn gridItem={<BlurItem />} />} />}
      /> */}
      <div />
    </div>
  );
};

const GridColumn = ({ gridItem }) => {
  return (
    <div className="grid grid-cols-4">
      <div>{gridItem}</div>
      <div>{gridItem}</div>
      <div>{gridItem}</div>
      <div>{gridItem}</div>
    </div>
  );
};
const GridRow = ({ gridItem }) => {
  return (
    <div className="grid grid-rows-4">
      <div>{gridItem}</div>
      <div>{gridItem}</div>
      <div>{gridItem}</div>
      <div>{gridItem}</div>
    </div>
  );
};

const BlurItem = () => {
  return (
    <div>
      <div
        key={Math.random() * 1000}
        className="w-6 h-6 backdrop-blur-10xl"
      ></div>
      <div
        key={Math.random() * 1000}
        className="w-6 h-6 backdrop-blur-10xl"
      ></div>
      <div
        key={Math.random() * 1000}
        className="w-6 h-6 backdrop-blur-10xl"
      ></div>
      <div
        key={Math.random() * 1000}
        className="w-6 h-6 backdrop-blur-10xl"
      ></div>
    </div>
  );
};
export default BlurImage;
