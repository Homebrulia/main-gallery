import React from 'react';
import axios from 'axios';
import styles from '../styles/app.css';
import Redirect from './redirect.jsx';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Gallery from './gallery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: []
    }
    this.nextListing = this.nextListing.bind(this);
    this.previousListing = this.previousListing.bind(this);
  }

  componentDidMount() {
    const queryString = window.location.pathname === '/' ? '/gallery/1/' :  window.location.pathname;
    axios.get('/api' + queryString + 'homesData')
    .then((res) => {
      this.setState({listing: res.data})
    })
    .catch((err) => {
      console.log(err);
    });
  }

  nextListing(event) {
    let url = window.location.pathname.split('/').filter(n => n);
    url[1]= Number(url[1]) + 1;
    const queryString = url.join('/');
    axios.get('/api' + queryString + 'homesData')
    .then((res) => {
      this.setState({listing: res.data})
    })
    .catch((err) => {
      console.log(err);
    });
  }
  previousListing(event) {
    let url = window.location.pathname.split('/').filter(n => n);
    url[1]= Number(url[1]) === 1 ? url[1] : Number(url[1]) - 1;
    const queryString = url.join('/');
    if (listing_id === 0) {
      listing_id = 1;
    }
    axios.get(`${url}api/${listing_id}homesData`)
    .then((res) => {
      this.setState({listing: res.data})
    })
    .catch((err) => {
      console.log(err);
    });
  }


  render() {
    if (this.state.listing.length === 0) {
      return <div><Redirect /></div>
    }

    return (
      <div className={styles['responsive-div']}>
        <Navbar />
        <Details listing={this.state.listing}/>
        <Gallery listing={this.state.listing}/>
        {/* <div className={styles['navbar']}>
          <div className={styles['nav-btn-box']}>
          <button className={styles['nav-btn']} onClick={this.previousListing}>Previous</button>
          </div>
          <div className={styles['nav-btn-box']}>
            <button className={styles['nav-btn']} onClick={this.nextListing}>Next</button>
          </div>
        </div> */}
      </div>
    )
  }
}


export default App;