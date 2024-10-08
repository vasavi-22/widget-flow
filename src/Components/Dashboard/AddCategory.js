import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeWidgetsFromCategory } from "../../store/dashboardSlice";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./Dashboard.css";

const AddCategory = ({ isVisible, onClose }) => {
  const categories = useSelector((state) => state.dashboard.categories);
  const dispatch = useDispatch();

  // State to track which widgets are checked
  const [checkedWidgets, setCheckedWidgets] = useState(
    categories.reduce((acc, category) => {
      acc[category.id] = category.widgets.reduce((widgetsAcc, widget) => {
        widgetsAcc[widget.id] = true; // Initially, all widgets are checked
        return widgetsAcc;
      }, {});
      return acc;
    }, {})
  );

  // State to manage active tab
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");

  // Handle checkbox change
  const handleCheckboxChange = (categoryId, widgetId) => {
    setCheckedWidgets((prevCheckedWidgets) => ({
      ...prevCheckedWidgets,
      [categoryId]: {
        ...prevCheckedWidgets[categoryId],
        [widgetId]: !prevCheckedWidgets[categoryId][widgetId], // Toggle the checkbox state
      },
    }));
  };

  // Handle form submission to update the store
  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(checkedWidgets).forEach((categoryId) => {
      const widgetIdsToRemove = Object.keys(checkedWidgets[categoryId]).filter(
        (widgetId) => !checkedWidgets[categoryId][widgetId] // Widgets that are unchecked
      );

      if (widgetIdsToRemove.length > 0) {
        dispatch(
          removeWidgetsFromCategory({ categoryId, widgetIds: widgetIdsToRemove })
        );
      }
    });

    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog
      className="add-category-dialog full-screen-dialog"
      header={
        <div className="dialog-header">Add/Remove Widgets from Categories</div>
      }
      visible={isVisible}
      style={{ width: "35vw", position: "absolute", right: "0" }}
      onHide={onClose}
      footer={
        <div className="footer-div">
          <Button
            label="Cancel"
            icon="pi pi-times"
            onClick={onClose}
            className="btn-cancel"
          />
          <Button
            label="Update"
            icon="pi pi-check"
            onClick={handleSubmit}
            className="btn-confirm"
            autoFocus
          />
        </div>
      }
    >
      <div className="tab-container">
        <p>Personalize your dashboard by adding the following widget</p>
        <div className="tab-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab-button ${
                activeTab === category.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {categories.map(
            (category) =>
              activeTab === category.id && (
                <div key={category.id}>
                  <form>
                    <ul>
                      {category.widgets.map((widget) => (
                        <li key={widget.id}>
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={checkedWidgets[category.id][widget.id]}
                              onChange={() =>
                                handleCheckboxChange(category.id, widget.id)
                              }
                            />
                            <span className="checkbox-mark"></span>
                            {widget.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </form>
                </div>
              )
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AddCategory;
