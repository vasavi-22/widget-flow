import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWidgetsFromCategory } from '../../store/dashboardSlice';

const AddCategory = () => {
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

  // Handle checkbox change
  const handleCheckboxChange = (categoryId, widgetId) => {
    setCheckedWidgets((prevCheckedWidgets) => ({
      ...prevCheckedWidgets,
      [categoryId]: {
        ...prevCheckedWidgets[categoryId],
        [widgetId]: !prevCheckedWidgets[categoryId][widgetId] // Toggle the checkbox state
      }
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
        dispatch(removeWidgetsFromCategory({ categoryId, widgetIds: widgetIdsToRemove }));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.widgets.map((widget) => (
              <li key={widget.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedWidgets[category.id][widget.id]}
                    onChange={() => handleCheckboxChange(category.id, widget.id)}
                  />
                  {widget.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button type="submit">Update Categories</button>
    </form>
  );
};

export default AddCategory;
