import axios from 'axios'
export function getFiles() {
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:8000/api/v1/all_files")
            .then((res) => {
                console.log("uploaded files", res)
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}