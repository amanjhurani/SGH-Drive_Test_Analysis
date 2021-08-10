import axios from 'axios'
export function uploadFile(data) {
    return new Promise((resolve, reject) => {
        var headers = {
            "Content-Type": "form-data"
        }
        axios.post("http://127.0.0.1:8000/api/v1/upload_file",data, {headers: headers})
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}