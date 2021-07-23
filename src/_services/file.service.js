
import { authHeader } from '../_helpers';
import http from '../http-common';
const jsFD = require('js-file-download');

export const fileService = {
    getFiles,
    submitFile,
    downloadFile,
    readFile
};

function submitFile(file, id){
    let formData = new FormData();

    formData.append("file", file);

    return http.post(`/upload/${id}`, formData, {
        headers: {
            ...authHeader(),
            "Content-Type": "multipart/form-data"
        }
    });
}

function getFiles(id) {
    return http({
        method: 'get',
        url: `/files/${id}`,
        headers: {
            ...authHeader()
        }
    })
}

function downloadFile(id, fileName){
    http({
        method: 'post',
        url: `files/${fileName}`,
        headers: {
            ...authHeader()
        },
        data: {
            "directory": id
        },
        responseType: 'blob'
    }).then((response) => {
        jsFD(response.data, fileName);
    });
}

function readFile(id, fileName){
    return http({
        method: 'post',
        url: `files/${fileName}`,
        headers: {
            ...authHeader()
        },
        data: {
            "directory": id
        },
        responseType: 'blob'
    })
}