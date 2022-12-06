const setLocalStorage = (videos) => {
    localStorage.setItem("videos", JSON.stringify(videos));
}

export default setLocalStorage;