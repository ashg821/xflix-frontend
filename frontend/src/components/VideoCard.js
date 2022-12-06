import '../componentStyles/videoCard.css'
import { Link } from "react-router-dom";
import calculateTime from '../utils/calcTime';
import axios from 'axios'
import config from '../config/config'
import { useSnackbar } from 'notistack';

const VideoCard = ({ video }) => {
    const { enqueueSnackbar } = useSnackbar();
    const addViewCount = async () => {
        try {
            await axios.patch(`${config.port}/videos/${video._id}/views`);

        } catch (err) {
            err.response.data ? enqueueSnackbar(err.response.data.message, { variant: "error" }) : enqueueSnackbar("Some Error occured", { varaint: "error" });
        }
    }

    return (
        <div className='col-sm-6 col-md-4 col-lg-3'>
            <div className="card" onClick={addViewCount}>
                <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
                    <img src={video.previewImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">{video.title}</p>
                        <p className="released-text">{calculateTime(video.releaseDate)}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default VideoCard