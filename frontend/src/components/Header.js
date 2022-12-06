import React, { useState } from 'react'
import '../componentStyles/header.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { MdUpload } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header = ({ fetchFilteredVideos }) => {
    const [activeAge, setActiveAge] = useState({
        Anyone: "",
        "7%2B": "",
        "12%2B": "",
        "16%2B": "",
        "18%2B": ""
    });
    const [activeGenre, setActiveGenre] = useState({
        All: "",
        Education: "",
        Sports: "",
        Comedy: "",
        Lifestyle: ""
    });

    const [searchString, setSearchString] = useState("");
    const [genreArray, setgenreArray] = useState([]);
    const [contentRating, setContentRating] = useState("");
    const [sortBy, setSortBy] = useState("");

    const ageHandler = (e) => {
        const activeAgeCopy = { ...activeAge };
        if (activeAgeCopy[e.target.value] === "active") {
            activeAgeCopy[e.target.value] = "";
            setContentRating("");
            fetchFilteredVideos(searchString, genreArrayToString(genreArray), "", sortBy);

        }
        else if (activeAgeCopy[e.target.value] === "") {
            Object.keys(activeAgeCopy).forEach(key => {
                activeAgeCopy[key] = "";
            });
            activeAgeCopy[e.target.value] = "active";
            setContentRating(e.target.value);
            fetchFilteredVideos(searchString, genreArrayToString(genreArray), e.target.value, sortBy);
        }
        setActiveAge(activeAgeCopy);
    }

    const genreHandler = (e) => {
        const activeGenreCopy = { ...activeGenre };
        let genreArrayCopy = genreArray;
        if (activeGenreCopy[e.target.value] === "active") {
            activeGenreCopy[e.target.value] = "";
            const index = genreArrayCopy.indexOf(e.target.value);
            genreArrayCopy.splice(index, 1);
            setgenreArray(genreArrayCopy);

        }
        else if (activeGenreCopy[e.target.value] === "") {
            activeGenreCopy[e.target.value] = "active";
            genreArrayCopy.push(e.target.value);
            setgenreArray(genreArrayCopy);
        }
        setActiveGenre(activeGenreCopy);
        fetchFilteredVideos(searchString, genreArrayToString(genreArrayCopy), contentRating, sortBy);
    }

    const searchHandler = (e) => {
        setSearchString(e.target.value);
        fetchFilteredVideos(e.target.value, genreArrayToString(genreArray), contentRating, sortBy);
    }

    const sortByHandler = (e) => {
        if (e.target.value) {
            setSortBy(e.target.value);
            fetchFilteredVideos(searchString, genreArrayToString(genreArray), contentRating, e.target.value);
        }
    }

    const genreArrayToString = (array) => {
        if (array.length === 1) return array[0];
        return array.join(",");
    }



    return (
        <nav className="navbar bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <span className="logo-text-one">X</span>
                    <span className="logo-text-two">FLIX</span>
                </Link>
                <div className="w-50" style={{ maxWidth: "550px" }}>
                    <input className="search-bar" placeholder="Search" aria-label="Search" value={searchString} onChange={searchHandler} name="search-bar" />
                    <button className="search-button"><AiOutlineSearch /></button>
                </div>
                <button className="upload-btn py-1" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal"><MdUpload />Upload</button>
                <div className="filter-container w-100 my-3">
                    <div className='genres-container' onClick={genreHandler}>
                        <button className={`filter-btn ${activeGenre.All}`} value="All" name="genres">All Genre</button>
                        <button className={`filter-btn ${activeGenre.Education}`} value="Education" name="genres">Education</button>
                        <button className={`filter-btn ${activeGenre.Sports}`} value="Sports" name="genres">Sports</button>
                        <button className={`filter-btn ${activeGenre.Comedy}`} value="Comedy" name="genres">Comedy</button>
                        <button className={`filter-btn ${activeGenre.Lifestyle}`} value="Lifestyle" name="genres">Lifestyle</button>
                    </div>
                    <div className='age-container' onClick={ageHandler}>
                        <button className={`filter-btn  ${activeAge.Anyone}`} value="Anyone" name="contentRating">Any age group</button>
                        <button className={`filter-btn ${activeAge["7%2B"]}`} value="7%2B" name="contentRating">7+</button>
                        <button className={`filter-btn ${activeAge["12%2B"]}`} value="12%2B" name="contentRating">12+</button>
                        <button className={`filter-btn ${activeAge["16%2B"]}`} value="16%2B" name="contentRating">16+</button>
                        <button className={`filter-btn ${activeAge["18%2B"]}`} value="18%2B" name="contentRating">18+</button>
                    </div>

                    <select className='filter-btn active sort-filter' value={sortBy} onChange={sortByHandler}>
                        <option value="">Sortby</option>
                        <option value="releaseDate">Release Date</option>
                        <option value="viewCount">View Count</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}

export default Header