import VideoCard from "./VideoCard";
import '../componentStyles/dashboard.css'


const Dashboard = ({ filteredVideos }) => {

    return (
        <>
            <div className="dashboard-container mt-3">
                <div className="row">
                    {filteredVideos && filteredVideos.map(video => (<VideoCard key={video._id} video={video} />))}
                </div>
            </div>
        </>
    )
}

export default Dashboard