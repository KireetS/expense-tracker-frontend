import React  from "react";

const Update = (props) => {
  // const [val ,setVal] = useState("")
  return (
    <>
      <input
        type="text"
        placeholder="update here"
        onChange={(e) => {
          props.setVal(e.target.value);
        }}
        className="px-2 py-1 bg-gray-600 text-white rounded-lg"
      />
    </>
  );
};

export default Update;
