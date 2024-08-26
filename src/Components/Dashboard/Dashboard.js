import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Dashboard.css";
import DoughnutChart from "./DoughnutChart";

const Dashboard = () => {
    const categories = useSelector(state => state.dashboard.categories);
    console.log(categories,"cattttttttttt");

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
                                </div>
                                 : 
                                <div className="no-div">
                                    <img src="/assets/images/no-graph.jpg" alt="" width="100px" height="100px" />
                                    <p>No graph data available</p>
                                </div> }
                            </div>
                        ))}
                        <div className="add-div">
                            <button>+ Add Widget</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;