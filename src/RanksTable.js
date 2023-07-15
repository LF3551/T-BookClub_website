import React from 'react';
import images from './images';

const RanksTable = () => {
  return (
    <div className="about-popup-content">
      <h3>Our Ranks:</h3>
      <table className="ranks-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Description</th>
            <th>Number of Speeches</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={images.rank1} alt="Rank 1" width="50" />
            </td>
            <td>The Bookworm Novice</td>
            <td>1 speech</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank2} alt="Rank 2" width="50" />
            </td>
            <td>The Literary Explorer</td>
            <td>2 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank3} alt="Rank 3" width="50" />
            </td>
            <td>The Book Enthusiast</td>
            <td>3 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank4} alt="Rank 4" width="50" />
            </td>
            <td>The Verbal Voyager</td>
            <td>4 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank5} alt="Rank 5" width="50" />
            </td>
            <td>The Literary Expert</td>
            <td>5 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank6} alt="Rank 6" width="50" />
            </td>
            <td>The Book Master</td>
            <td>6 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank7} alt="Rank 7" width="50" />
            </td>
            <td>The Literary Guru</td>
            <td>7 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank8} alt="Rank 8" width="50" />
            </td>
            <td>The Book Wizard</td>
            <td>8 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank9} alt="Rank 9" width="50" />
            </td>
            <td>The Literary Virtuoso</td>
            <td>9 speeches</td>
          </tr>
          <tr>
            <td>
              <img src={images.rank10} alt="Rank 10" width="50" />
            </td>
            <td>The Book Magician</td>
            <td>10 speeches</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RanksTable;
