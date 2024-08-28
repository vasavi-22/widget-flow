import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Dashboard.css";
import DoughnutChart from "./DoughnutChart";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { addWidget, removeWidget } from "../../store/dashboardSlice";
import AddCategory from "./AddCategory";

const Dashboard = () => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showWidgetDialog, setShowWidgetDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useSelector((state) => state.dashboard.categories);
  console.log(categories);
  const dispatch = useDispatch();

  const handleAddWidget = () => {
    setShowWidgetDialog(false);
    console.log(categoryId);
    console.log(widgetName);
    console.log(widgetText);
    const newWidget = {
      id: `widget-${new Date().getTime()}`,
      name: widgetName,
      text: widgetText,
    };
    dispatch(addWidget({ categoryId, widget: newWidget }));
    setWidgetName("");
    setWidgetText("");
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  // Toggle the visibility of the "Add Category" section
  const handleAddCategoryClick = () => {
    setShowCategoryDialog(true);
  };

  return (
    <div className="dashboard">
      <h1>CNAPP Dashboard</h1>
      <div className="top">
        <input
          type="text"
          className="search"
          placeholder="&#128269; Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleAddCategoryClick}>Add Category</button>
      </div>
      {categories.map((cat) => (
        <div className="category-div" key={cat.id}>
          <h3>{cat.name}</h3>
          <div className="widget-div">
            {cat.widgets
              .filter((widget) =>
                widget.name
                  .toLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .map((widget) => (
                <div className="widget" key={widget.id}>
                  <img
                    src="/assets/images/cross.png"
                    alt=""
                    width="20px"
                    height="20px"
                    onClick={() => handleRemoveWidget(cat.id, widget.id)}
                    style={{ marginLeft: "auto" }}
                  />
                  <h5>{widget.name}</h5>
                  {widget.data ? (
                    <div className="chart-div">
                      <DoughnutChart
                        className="chart"
                        data={widget.data}
                        title={widget.name}
                        colors={widget.colors}
                      />
                    </div>
                  ) : (
                    <div className="no-div">
                      <img
                        src="/assets/images/no-graph.jpg"
                        alt=""
                        width="100px"
                        height="100px"
                      />
                      <p>No graph data available</p>
                    </div>
                  )}
                </div>
              ))}
            <div className="add-div">
              <button
                className="add-btn"
                onClick={() => {
                  setCategoryId(cat.id);
                  setShowWidgetDialog(true);
                }}
              >
                + Add Widget
              </button>
              <Dialog
                className="add-widget full-screen-dialog"
                header={<div className="dialog-header">Add Widget</div>}
                visible={showWidgetDialog}
                style={{ width: "35vw", height: "100vh", marginLeft: "auto" }}
                onHide={() => {
                  setShowWidgetDialog(false);
                  setWidgetName("");
                  setWidgetText("");
                }}
                footer={
                  <div className="footer-div">
                    <Button
                      className="btn-cancel"
                      label="Cancel"
                      onClick={() => {
                        setShowWidgetDialog(false);
                        setWidgetName("");
                        setWidgetText("");
                      }}
                    />
                    <Button
                      className="btn-confirm"
                      label="Confirm"
                      onClick={handleAddWidget}
                      autoFocus
                    />
                  </div>
                }
              >
                <form>
                  <input
                    type="text"
                    placeholder="Enter Widget Name"
                    value={widgetName}
                    onChange={(e) => setWidgetName(e.target.value)}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Enter Widget Text"
                    value={widgetText}
                    onChange={(e) => setWidgetText(e.target.value)}
                    required
                  />
                </form>
              </Dialog>

              {/* Add Category Dialog */}
              <AddCategory
                isVisible={showCategoryDialog}
                onClose={() => setShowCategoryDialog(false)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
