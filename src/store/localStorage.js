// utility functions to save and load the Redux state from localStorage.
export const loadState = () => {
    try{
        const serializedState = localStorage.getItem("dashboardState");
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err){
        console.log("Could not load state from localStorage ", err);
        return undefined;
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem("dashboardState", serializedState);
    } catch(err){
        console.log("Could not save to the localStorage ", err);
    }
}