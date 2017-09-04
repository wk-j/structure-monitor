import * as axios from "axios";

export async function getStructures(path) {
    var req = axios.post("http://localhost:5000/api/structure/getStructures", {
        path: path
    });
    return await req;
}