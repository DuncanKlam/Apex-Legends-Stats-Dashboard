let DownloadJSON = {

    makeJSONAndDownload({data, filename}){
        const fileData = JSON.stringify(data);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename + '.json';
        link.href = url;
        link.click();
    }
}

export default DownloadJSON