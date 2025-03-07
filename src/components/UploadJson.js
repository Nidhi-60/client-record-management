import { useNavigate } from "react-router-dom";

const UploadJSON = () => {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      let currentData = JSON.parse(e.target.result);

      let prevData = JSON.parse(localStorage.getItem("jsonData")) || [];

      currentData.forEach((ele) => {
        let findedEmail = prevData?.find(
          (preEle) => preEle.email === ele.email
        );

        if (!findedEmail) {
          prevData.push(ele);
        }
      });

      localStorage.setItem("jsonData", JSON.stringify(prevData));
    };

    navigate("/datas");
  };

  return (
    <div className="upload-doc">
      <input type="file" onChange={handleFileChange} name="file" />
    </div>
  );
};

export default UploadJSON;
