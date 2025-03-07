import { useEffect, useState } from "react";
import { THEAD } from "../resourse/resourseArray";
import Pagination from "../common/Pagination";
import { Button } from "react-bootstrap";

const Datas = () => {
  const [jsonData, setJsonData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState({ flag: false, id: undefined });
  const [editData, setEditData] = useState({});

  const itemsPerPage = 2;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = jsonData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jsonData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jsonData.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    let datas = JSON.parse(localStorage.getItem("jsonData"));
    setJsonData(datas);
    setOriginalData(datas);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const filteredData = originalData.filter(
        (item) =>
          item.name.includes(search) ||
          item.email.includes(search) ||
          item.id.includes
      );

      setJsonData(filteredData);
    }
  };

  const handleEdit = (id) => {
    setEditMode({ flag: true, id: id });
    let findedData = jsonData.find((ele) => ele.id === id);
    setEditData(findedData);
  };

  const handleEditTextChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    let filteredData = jsonData.filter((ele) => ele.id !== id);

    setJsonData(filteredData);

    localStorage.setItem("jsonData", JSON.stringify(filteredData));
  };

  const handleCancel = () => {
    setEditMode({ flag: false, id: undefined });
    setEditData({});
  };

  const handleOkay = () => {
    let updatedData = jsonData.map((ele) => {
      if (ele.id === editData.id) {
        return { ...ele, name: editData.name, email: editData.email };
      } else {
        return ele;
      }
    });

    setJsonData(updatedData);
    localStorage.setItem("jsonData", JSON.stringify(updatedData));
    setEditMode({ flag: false, id: undefined });
    setEditData({});
  };

  const downloadJsonFile = () => {
    const fileName = "sample";
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <>
      <div className="title-bar">
        <div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <div>
            <Button variant="outline-primary" onClick={downloadJsonFile}>
              Download JSON File
            </Button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            {THEAD.map((ele) => {
              return <th key={ele}>{ele}</th>;
            })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((ele) => {
            return (
              <tr key={ele.id}>
                {editMode.flag && ele.id === editMode.id ? (
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditTextChange}
                    />
                  </td>
                ) : (
                  <td>{ele.name}</td>
                )}
                {editMode.flag && ele.id === editMode.id ? (
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={editData.email}
                      onChange={handleEditTextChange}
                    />
                  </td>
                ) : (
                  <td>{ele.email}</td>
                )}

                <td>
                  {editMode.flag && editMode.id === ele.id ? (
                    <>
                      <Button variant="outline-primary" onClick={handleOkay}>
                        Okay
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        onClick={() => handleEdit(ele.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => handleDelete(ele.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
    </>
  );
};

export default Datas;
