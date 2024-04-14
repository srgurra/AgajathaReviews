import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeaderHome from '../HeaderHome/HeaderHome';
import MenuBar from '../MenuBar/MenuBar';
import Slideshow from '../Slideshow/Slideshow';
import FromThisWeek from '../FromThisWeek/FromThisWeek';
import WeeklyJournal from '../WeeklyJournal/WeeklyJournal';
import StoryHead from '../StoryHead/StoryHead';
import SearchBar from '../SearchBar/SearchBar';
import Highlights from '../Highlights/Highlights';
import MoviesReel from '../MoviesReel/MoviesReel';
import ReviewerTopRated from '../ReviewerTopRated/ReviewerTopRated';
import AudienceTopRated from '../AudienceTopRated/AudienceTopRated';
import ActorList from '../ActorsList/ActorsList';
import Footer from '../Footer/Footer';

const images = [
    {
        src: 'https://picsum.photos/id/1018/1000/600',
        alt: 'Slide 1',
        heading: 'Slide 1 Heading',
        text: 'Slide 1 Description'
    },
    {
        src: 'https://picsum.photos/id/1015/1000/600',
        alt: 'Slide 2',
        heading: 'Slide 2 Heading',
        text: 'Slide 2 Description'
    },
    {
        src: 'https://picsum.photos/id/1019/1000/600',
        alt: 'Slide 3',
        heading: 'Slide 3 Heading',
        text: 'Slide 3 Description'
    }
];

function Home() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/movies/all')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleSearch = (searchTerm) => {
        // Perform search functionality with the search term
        // Adjust the logic according to your needs
        console.log('Perform search with term:', searchTerm);
    };

    return (
        <div style={{ backgroundColor: '#333' }} >
            <HeaderHome />
            <Highlights />
            {/* <MenuBar /> */}
            {/* <div style={{ position: 'relative' }}>
                <Slideshow />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                }}>
                    <SearchBar />
                </div>
            </div> */}


            {/* <MoviesReel /> */}
            <FromThisWeek />
            <ReviewerTopRated />
            <AudienceTopRated />
{/*             <ByOTT />
            <ByLanguage />
            <ByGenre /> */}
            {/* <WeeklyJournal /> */}
            <StoryHead />
            <ActorList />
            <Footer />
        </div>
    );
}

export default Home;
