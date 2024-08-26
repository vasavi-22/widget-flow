import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    categories: [
      {
        id: "1",
        name: "CSPM Executive Dashboard",
        widgets: [
          { id: "widget-1", name: "Cloud Accounts", text: "Random text for Cloud Accounts widget", data : { "Connected" : 2, "Not Connected" : 2 }, colors :["#0066B2", "#B0E0E6"] },
          { id: "widget-2", name: "Cloud Account Risk Assessment", text: "Random text for Cloud Account Risk Assessment widget", data : { "Not Available" : 36, "Warning" : 681, "Failed" : 1689, "Passed" : 7253 }, colors: ['#D3D3D3', '#FFBF00', '#A30000', '#009A44',] }
        ]
      },
      {
        id: "2",
        name: "CWPP Dashboard",
        widgets: [
          { id: "widget-3", name: "Top 5 Namespace specific alerts", text: "Random text for Top 5 Namespace specific alerts" },
          { id: "widget-4", name: "Workload Alerts", text: "Random text for Workload alerts" }
        ]
      },
      {
        id : "3",
        name: "Registry Scan",
        widgets: [
            { id : "widget-5", name: "Image Risk Assessment", text: "Random text for Image Risk Assessment"},
            { id : "widget-6", name: "Image Security Issues", text: "Random text for Image Security Issues"}
        ]
      }
    ]
  };
  

const dashboardSlice = createSlice({
    name : "dashboard",
    initialState,
    reducers : {
        addWidget : (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if(category){
                category.widgets.push(widget);
            }
        },
        removeWidget : (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if(category){
                category.widgets = category.widgets.filter(widget => widget.id === widgetId);
            }
        },
        addCategory : (state, action) => {
            const { category } = action.payload;
            state.categories.push(category);
        },
        removeCategory : (state, action) => {
            const { categoryId } = action.payload;
            state.categories = state.categories.filter(category => category.id === categoryId);
        }
    }
});

export const { addWidget, removeWidget, addCategory, removeCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;
