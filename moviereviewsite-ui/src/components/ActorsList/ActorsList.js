import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActorsList.css'

const ActorList = () => {

    const actors = [
        { name: 'Mahesh Babu', image: 'https://m.media-amazon.com/images/M/MV5BMDdjMTAxYmYtOTQ5OS00Mjc2LTk3MDctZTcxNmFlNDY2YjYwXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_.jpg' },
        { name: 'Prabhas', image: 'https://m.media-amazon.com/images/M/MV5BMjliZmI3YmMtYWU1NS00MjVlLTkxZTQtYjIzYzFkNWNjOTZkXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_FMjpg_UX1000_.jpg' },
        { name: 'Samantha', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Samantha_Ruth_Prabhu_attends_Critics_Choice_Awards_2022_%282%29.jpg' },
        { name: 'Tarak', image: 'https://cdn.siasat.com/wp-content/uploads/2023/05/Jr-NTR.jpg' },
        { name: 'Pooja Hegde', image: 'https://www.mirchi9.com/wp-content/uploads/2023/05/Pooja-Hegde-1.jpg' },
        { name: 'Anushka', image: 'https://m.media-amazon.com/images/M/MV5BZTkxYmU1NmUtNGE4Ni00OWNmLWE5YzktNTJiZTlmMTIyMTM5XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg' },
        // Add more actors as needed
      ];
      const navigate = useNavigate();
      const title= "Budugu"
        const handleClick = () => {
            navigate(`/ott/Aha/movies`);
        };
    return (
        <div>
        <div className="slidertitle-strip">
        <h2 className="slidertitle">Watch your Stars</h2>
      </div>
        <div className="actor-list">
        {actors.map((actor, index) => (
            <div key={index} className="actor-circle" onClick={handleClick}>
            <img src={actor.image} alt={actor.name} className="actor-image" />
            </div>
        ))}
        </div>
        </div>
    );
};

export default ActorList;
