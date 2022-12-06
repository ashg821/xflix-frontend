import { Link, useParams } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import '../componentStyles/videoPlayer.css'
import calculateTime from '../utils/calcTime';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import getLocalStorage from '../utils/getLocalStorage';
import { useSnackbar } from 'notistack';




const VideoPlayer = () => {
    const allVideos = getLocalStorage();
    const { videoId } = useParams();

    const [videos, setVideos] = useState(allVideos);
    const [video, setVideo] = useState(null);
    const [views, setViews] = useState(null);
    const [upVote, setUpvote] = useState(undefined);
    const [downVote, setDownvote] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();


    const fetchVideoById = async () => {
        try {
            const { data } = await axios.get(`${config.port}/videos/${videoId}`);
            const allVideosCopy = videos.slice();
            allVideosCopy.find((ele, index) => {
                if (ele._id == videoId) {

                    allVideosCopy.splice(index, 1);
                    return true;
                }
                return false;
            });

            setVideo(data);
            setVideos(allVideosCopy);
            setViews(data.viewCount);
            setUpvote(data.votes.upVotes);
            setDownvote(data.votes.downVotes);

        } catch (err) {
            err.response.data ? enqueueSnackbar(err.response.data.message, { variant: "error" }) : enqueueSnackbar("Some Error occured", { varaint: "error" });
        }

    }

    const increaseUpvote = async (e) => {
        await axios.patch(`${config.port}/videos/${video._id}/votes`,
            {
                vote: "upVote",
                change: "increase"
            });
        setUpvote(upVote + 1);
        e.target.style.backgroundColor = "#4CA3FC";
        e.target.style.color = "white";
    }
    const increaseDownvote = async () => {
        await axios.patch(`${config.port}/videos/${video._id}/votes`,
            {
                vote: "downVote",
                change: "increase"
            });

        setDownvote(downVote + 1);
    }


    useEffect(() => {
        // console.log("inside use effect", allVideos);
        fetchVideoById();
    }, [videoId, views, JSON.stringify(videos)]);
    return (
        <>
            <nav className="navbar bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <span className="logo-text-one">X</span>
                        <span className="logo-text-two">FLIX</span>
                    </Link>
                </div>
            </nav>
            {video && <div className="dashboard-container">
                <iframe src={`https://www.${video.videoLink}`} title="A youtube video on xflix platform" className="iframe mt-4" sandbox='allow-scripts allow-same-origin allow-presentation'>
                </iframe>
                <div className='iframe-container'>
                    <div className="section-one">
                        <p className='iframe-title'>{video.title}</p>
                        <div className="iframe-viewCount-time">
                            <p className='iframe-viewCount'>+{views}</p>
                            <li className='iframe-release-date'>{calculateTime(video.releaseDate)}</li>
                        </div>
                    </div>
                    <div className="iframe-vote-btn-container">
                        <button className='iframe-vote-btn' onClick={(e) => increaseUpvote(e)}><AiFillLike style={{ marginRight: "3px" }} /><span style={{ color: "white" }}>{upVote}</span></button>
                        <button className='iframe-vote-btn' onClick={increaseDownvote}><AiFillDislike style={{ marginRight: "3px" }} /><span style={{ color: "white" }}>{downVote}</span></button>
                    </div>
                </div>
            </div>
            }
            <Dashboard filteredVideos={videos} />
        </>
    )
}

export default VideoPlayer
