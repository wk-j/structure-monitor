import "semantic-ui-css/semantic.css";
import "../style.css";

import { getStructures } from "./api";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { getCurrentDir, startBackend } from "./utility";

export class Structure {
    name = "";
    fullName = "";
    files = [];
    folders = [];
}

export class Model {
    @observable
    structure = new Structure();

    @observable
    path = getCurrentDir();

    setPath = action((path) => {
        console.log(path);
        this.path = path;
    });
}

startBackend();

let model = new Model();

setInterval(() => {
    getStructures(model.path).then(rs => {
        console.log("reload ...");
        model.structure = rs.data;
    });
}, 1000);



@observer
export class App extends React.Component {

    getStructure() {
        return this.props.model.structure;
    }

    getPath() { 
        return this.props.model.path;
    }

    file(item) {
        return (
            <div className="item" key={item.fullName}>
                <i className="file icon"></i>
                <div className="content">
                    <div className="header">{item.name}</div>
                    {/* <div className="description">Config file for setting packaged themes</div> */}
                </div>
            </div>
        );
    }

    folder(str) {
        return (
            <div className="item" key={str.fullName}>
                <i className="cube icon"></i>
                <div className="content">
                    <div className="header">{str.name}</div>
                    <div className="description">{str.folders.length} folders {str.files.length} files -- {str.fullName} </div>
                    <div className="list">
                        {str.files.map(x => this.file(x))}
                        {str.folders.map(x => this.folder(x))}
                    </div>
                </div>
            </div>
        );
    }

    handleChange(event) {
        var value = event.target.value;
        this.props.model.setPath(value);
    }

    render() {
        let str = this.getStructure();
        let path = this.getPath();

        let mainStyle = {
            top: 0,
            paddingTop: "10px",
            paddingBottom: "10px",
            width: "100%",
            overflow: "hidden",
            position: "fixed",
            backgroundColor: "white",
            width: "100%",
        }

        let topStyle = {

        }

        let bottomStyle = {
            marginTop: "60px",
        }

        return (
            <div>
                <div style={mainStyle}>
                    <div className="ui left icon input" style={topStyle}>
                        <input type="text" size="80" placeholder="" value={path} onChange={e => this.handleChange(e)} />
                        <i className="ui folder icon"/>
                    </div>
                </div>
                <div className="ui list" style={bottomStyle}>
                    <div className="item">
                        <i className="cube icon"></i>
                        <div className="content">
                            <div className="header">{str.name}</div>
                            <div className="description">{str.folders.length} folders {str.files.length} files -- {str.fullName}</div>
                            <div className="list">
                                {str.files.map(x => this.file(x))}
                                {str.folders.map(x => this.folder(x))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App model={model} />, document.getElementById("app"));
