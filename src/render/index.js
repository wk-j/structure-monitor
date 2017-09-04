import { getStructures } from "./api";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { observable } from "mobx";
import { observer } from "mobx-react";

export class Structure { 
    name = "";
    files = [];
    folders = [];
}

export class Model { 
    @observable
    structure = new Structure();
}

let model = new Model();

getStructures("/Users/wk/Source/project/structure-monitor/backend").then(rs => {
    console.log(rs.data);
    model.structure = rs.data;
});

@observer
export class App extends React.Component {
    
    getStructure() { 
        return this.props.model.structure;
    }

    render() {
        let str = this.getStructure();
        return (
            <h1>{str.name}</h1>
        );
    }
}

ReactDOM.render(<App model={model}/>, document.getElementById("app"));
