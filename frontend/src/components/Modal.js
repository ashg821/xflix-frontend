import '../componentStyles/modal.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { useSnackbar } from 'notistack';
// import { useHistory } from 'react-router-dom';


const Modal = () => {
    const [data, setData] = useState({
        videoLink: "",
        previewImage: "",
        title: "",
        genre: "",
        contentRating: "",
        releaseDate: ""
    });


    const { enqueueSnackbar } = useSnackbar();
    // const history = useHistory();

    const onChangeHandler = (e) => {
        const dataCopy = data;
        dataCopy[e.target.name] = e.target.value;
        setData({ ...dataCopy });
    }

    const uploadVideo = async () => {
        try {
            await axios.post(`${config.port}/videos`, data);
            enqueueSnackbar("Video uploaded successfully", { variant: "success" })
            window.location.reload();
            // history.push('/');
        } catch (err) {
            err.response.data ? enqueueSnackbar(err.response.data.message, { variant: "error" }) : enqueueSnackbar("Some Error occured", { varaint: "error" });
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload Video</h5>
                        <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><AiOutlineClose style={{ fontSize: "25px" }} /></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control form-element" placeholder='Video Link' name="videoLink" onChange={onChangeHandler} />
                        <div className="form-text">This link will be used to derive the video</div>
                        <input className="form-control form-element" placeholder='Thumbnail Image Link' name="previewImage" onChange={onChangeHandler} />
                        <div className="form-text">This link will be used to preview the thumbnail image</div>
                        <input className="form-control form-element" placeholder='Title' name="title" onChange={onChangeHandler} />
                        <div className="form-text">The title will be representative text for video</div>
                        <select className="form-select form-element" aria-label="Default select example" name="genre" onChange={onChangeHandler}>
                            <option>Genre</option>
                            <option value="All">All Genre</option>
                            <option value="Education">Education</option>
                            <option value="Sports">Sports</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        <div className="form-text">Genre will help in categorizing your videos</div>
                        <select className="form-select form-element" aria-label="Default select example" name="contentRating" onChange={onChangeHandler}>
                            <option>Suitable age group for this clip</option>
                            <option value="Anyone">Any age group</option>
                            <option value="7+">7+</option>
                            <option value="12+">12+</option>
                            <option value="16+">16+</option>
                            <option value="18+">18+</option>
                        </select>
                        <div className="form-text">This will be used to filter videos on age group suitability</div>
                        <input type="date" className="form-control form-element" placeholder='Releasse Date' name="releaseDate" onChange={onChangeHandler} />
                        <div className="form-text">This will be used to sort videos</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={uploadVideo}>Upload Video</button>
                        <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal