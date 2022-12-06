const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("videos"));
}

export default getLocalStorage;