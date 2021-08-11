import axios from 'axios'
export function getRSCP(fileName) {
    var data = {
        file_name: fileName
    }
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/v1/display_rscp", data)
            .then((res) => {
                console.log("rscp data", res)
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}
export function getRSSI(fileName) {
    var data = {
        file_name: fileName
    }
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/v1/display_rssi", data)
            .then((res) => {
                console.log("rscp data", res)
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}

export function getECIO(fileName) {
    var data = {
        file_name: fileName
    }
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/v1/display_eclo", data)
            .then((res) => {
                console.log("rscp data", res)
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}
export function getKMeans(fileName) {
    var data = {
        file_name: fileName
    }
    return new Promise((resolve, reject) => {
        axios.post("http://127.0.0.1:8000/api/v1/display_kmeans", data)
            .then((res) => {
                console.log("rscp data", res)
                resolve(res)
            })
            .catch((err) => {
                console.log("something went wrong in getFiles", err)
                reject(err)
            })
    })
}
