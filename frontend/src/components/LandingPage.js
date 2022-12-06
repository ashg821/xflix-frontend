import { useState, useEffect } from "react"
import axios from 'axios';
import config from "../config/config";

import Dashboard from "./Dashboard"
import Header from "./Header"
import Modal from "./Modal";
import { useSnackbar } from 'notistack';



const LandingPage = ({ allVideos }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [videos, setVideos] = useState(allVideos);
    const fetchFilteredVideos = async (title, genres, contentRating, sortBy) => {
        try {
            const uri = `${config.port}/videos?${title ? "title=" + title : ""}${genres ? "&genres=" + genres : ""}${contentRating ? "&contentRating=" + contentRating : ""}${sortBy ? "&sortBy=" + sortBy : ""}`;
            const { data } = await axios.get(uri);
            const filteredVideos = data.videos;
            setVideos(filteredVideos);
        } catch (err) {

            err.response.data ? enqueueSnackbar(err.response.data.message, { variant: "error" }) : enqueueSnackbar("Some error occured", { variant: "error" });
        }
    }

    useEffect(() => {
        setVideos(allVideos);
    }, [allVideos]);

    return (
        <>
            <Header fetchFilteredVideos={fetchFilteredVideos} />
            <Dashboard filteredVideos={videos} />
            <Modal />
        </>
    )
}

export default LandingPage