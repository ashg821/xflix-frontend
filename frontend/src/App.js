import './App.css';
import { useEffect, useState } from "react"
import axios from 'axios';
import config from './config/config';
import LandingPage from './components/LandingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import VideoPlayer from './components/VideoPlayer';
import setLocalStorage from './utils/setLocalStorage'
import { useSnackbar } from 'notistack'



function App() {
  const [videos, setVideos] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const getAllVideos = async () => {
    try {
      const { data } = await axios.get(`${config.port}/videos`);
      const allVideos = data.videos;
      setLocalStorage(allVideos);
      setVideos(() => allVideos);

    } catch (err) {
      err.response.data ? enqueueSnackbar(err.response.data.message, { variant: "error" }) : enqueueSnackbar("Some Error occured", { varaint: "error" });
    }
  }
  useEffect(() => {
    getAllVideos();

  }, [JSON.stringify(videos)]);
  return (

    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage allVideos={videos} />
          </Route>
          <Route exact path="/video/:videoId">
            <VideoPlayer allVideos={videos} />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
