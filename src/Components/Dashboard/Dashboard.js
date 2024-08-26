import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Dashboard.css";
import DoughnutChart from "./DoughnutChart";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { addWidget, removeWidget } from "../../store/dashboardSlice";

const Dashboard = () => {
    const [widgetName, setWidgetName] = useState("");
    const [widgetText, setWidgetText] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [show, setShow] = useState(false)
    const categories = useSelector(state => state.dashboard.categories);
    console.log(categories);
    const dispatch = useDispatch();

    const handleAddWidget = () => {
        setShow(false);
        console.log(categoryId);
        console.log(widgetName);
        console.log(widgetText);
        const newWidget = {
            id : `widget-${new Date().getTime()}`,
            name : widgetName,
            text : widgetText
        }
        dispatch(addWidget({categoryId, widget: newWidget}));
    }

    const handleRemoveWidget = (categoryId, widgetId) => {
        dispatch(removeWidget({categoryId, widgetId}));
    }

    return(
        <div className="dashboard">
            <h1>CNAPP Dashboard</h1>
            {categories.map((cat) => (
                <div className="category-div" key={cat.id}>
                    <h3>{cat.name}</h3>
                    <div className="widget-div">
                        {cat.widgets.map(widget => (
                            <div className="widget" key={widget.id}>
                                <h5>{widget.name}</h5>
                                {widget.data ? 
                                <div className="chart-div">
                                    <DoughnutChart className="chart" data={widget.data} title={widget.name} colors={widget.colors}/>
                                    <button onClick={() => handleRemoveWidget(cat.id, widget.id)}>Remove</button>
                                </div>
                                 : 
                                <div className="no-div">
                                    <img src="/assets/images/no-graph.jpg" alt="" width="100px" height="100px" />
                                    <p>No graph data available</p>
                                    <button onClick={() => handleRemoveWidget(cat.id, widget.id)}>Remove</button>
                                </div> }
                            </div>
                        ))}
                        <div className="add-div">
                            <button onClick={() => {
                                setCategoryId(cat.id);
                                setShow(true);
                            }}>+ Add Widget</button>
                            <Dialog
                            className="add-widget"
                            header="Add Widget"
                            visible={show}
                            style={{ width: "35vw", height: "35vw" }}
                            onHide={() => {
                                setShow(false);
                                setWidgetName("");
                                setWidgetText("");
                            }}
                            footer={
                                <div className="footer-div">
                                    <Button 
                                    label="Cancel"
                                    onClick={() => {
                                        setShow(false);
                                        setWidgetName("");
                                        setWidgetText("");
                                    }}
                                    />
                                    <Button 
                                    label="Confirm"
                                    onClick={handleAddWidget}
                                    autoFocus
                                    />
                                </div>
                            }
                            >
                                <form>
                                    <input type="text"
                                    placeholder="Enter Widget Name"
                                    value={widgetName}
                                    onChange={(e) => setWidgetName(e.target.value)}
                                    required
                                    />
                                    <br />
                                    <input type="text"
                                    placeholder="Enter Widget Text"
                                    value={widgetText}
                                    onChange={(e) => setWidgetText(e.target.value)}
                                    required
                                    />
                                </form>
                            </Dialog>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;