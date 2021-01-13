import './App.css';
import React from "react";
import axios from "axios";

import styles from "./assets/styles.module.css";

import searchIcon from "./assets/search.svg";
import trashIcon from "./assets/trash.svg";
import shareIcon from "./assets/share-android.svg";
import copyIcon from "./assets/copy.svg";
import xIcon from "./assets/x.svg";

import SnackBar from "./snackBar.js";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      titleSearchInput:"",
      searchResults:[],
      nominationsList:[],
      searchResultErrorMessage:"",
      shareLinkIsActive:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.unNominateMovie = this.unNominateMovie.bind(this);
    this.isNominated = this.isNominated.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.handleShareLinkModalClick = this.handleShareLinkModalClick.bind(this);
    this.copyLink = this.copyLink.bind(this);
    this.showShareLinkModal = this.showShareLinkModal.bind(this);

    this.inputRef = React.createRef();
    this.inputDivRef = React.createRef();
    this.snackBarRef = React.createRef();
    this.shareLinkContainerRef = React.createRef();
    this.shareLinkInputRef = React.createRef();
    this.closeModalButtonRef = React.createRef();
  }
  componentDidMount(){
    let queryParams = new URLSearchParams(window.location.search).get('nomi');
    if(queryParams && queryParams.length>0){
      let movieIdArray = queryParams.split("$$");
      let linkNominations = [];
      let axiosRequestList = [];
      for(let i=0;i<movieIdArray.length;i++){
        axiosRequestList.push(axios.get("https://www.omdbapi.com/?apikey="+process.env.REACT_APP_OMDB_KEY+"="+movieIdArray[i]));
      }
      axios.all(axiosRequestList).then(axios.spread((...responses)=>{
        for(let j=0;j<responses.length;j++){
          if(responses[j].data.Response === "True"){
            //has a response with movie result
            linkNominations.push(responses[j].data);
          }
        }
        if(linkNominations.length>0){
          this.setState({
            nominationsList:linkNominations
          });
        }
      }));
    }else{
      if (typeof(Storage) !== "undefined" && localStorage.movieNominations) {
        this.setState({
          nominationsList:JSON.parse(localStorage.movieNominations)
        });
      }
    }

    if(this.inputRef.current && this.inputDivRef.current){
      this.inputRef.current.onfocus = ()=>{
        this.inputDivRef.current.classList.add(styles.focusedDiv);
      }
      this.inputRef.current.onblur = ()=>{
        this.inputDivRef.current.classList.remove(styles.focusedDiv);
      }
    }
  }
  handleInputChange(e){
    const {name, value} = e.target;
    if(name==="titleSearchInput"){
      if(value.length>0){
        axios.get("https://www.omdbapi.com/?apikey="+process.env.REACT_APP_OMDB_KEY+"&s="+value+"&type=movie").then((res)=>{
          if(res.data.Response === "True"){
            //has a response with movie result
            this.setState({
              searchResults:res.data.Search
            });
          }else{
            if(res.data.Error){
              this.setState({
                searchResultErrorMessage:res.data.Error
              });
            }
          }
        }).catch((err)=>{
          this.snackBarRef.current.openSnackBar("There was an error with omdb's server! Please try again.");
        });
      }else{
        this.setState({
          searchResults:[],
          searchResultErrorMessage:""
        });
      }
    }

    this.setState({
      [name]:value
    });
  }

  updateLocalStorage(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("movieNominations", JSON.stringify(this.state.nominationsList));
    }
  }
  clearLocalStorage(){
    if (typeof(Storage) !== "undefined") {
      localStorage.removeItem("movieNominations");
    }
  }

  nominateMovie(movie){
    let id = movie.imdbID;
    let nominations = this.state.nominationsList;
    for(let i=0;i<nominations.length;i++){
      if(nominations[i].imdbID === id){
        return;
      }
    }
    if(this.state.nominationsList.length<=4){
      nominations.push(movie);
      this.setState({
        nominationsList:nominations
      }, ()=>{this.updateLocalStorage()});
    }
  }

  unNominateMovie(movie){
    let id = movie.imdbID;
    let nominations = this.state.nominationsList;
    for(let i=0;i<nominations.length;i++){
      if(nominations[i].imdbID === id){
        nominations.splice(i,1);
        this.setState({
          nominationsList:nominations
        }, ()=>{this.updateLocalStorage()});
        return;
      }
    }
  }

  isNominated(movieId){
    for(let i=0;i<this.state.nominationsList.length;i++){
      if(this.state.nominationsList[i].imdbID === movieId){
        return true;
      }
    }
    return false;
  }

  showShareLinkModal(){
    if(this.state.nominationsList.length>0){
      this.setState({
        shareLinkIsActive:true
      });
    }else{
      this.snackBarRef.current.openSnackBar("Please nominate a movie before sharing your list.");
    }
  }

  handleShareLinkModalClick(e){
    if(e.target === this.shareLinkContainerRef.current || e.target === this.closeModalButtonRef.current){
      this.setState({
        shareLinkIsActive:false
      });
    }
  }


  copyLink(){
    if(this.shareLinkInputRef.current){
      let input = this.shareLinkInputRef.current;
      input.select();
      input.setSelectionRange(0, 99999);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      this.snackBarRef.current.openSnackBar("Link copied successfully!");
    }else{
      this.snackBarRef.current.openSnackBar("Could not copy link:(");
    }
  }


  render(){
    let searchResults;
    if(this.state.searchResults.length>0){
      searchResults = this.state.searchResults.map((value, key)=>{
        return (
          <div key={key} className={styles.movieCard}>
            <div className={styles.movieCardPoster} style={{backgroundImage:"url('"+value.Poster+"')"}}></div>
            <p className={styles.regularText}>{value.Title} ({value.Year})</p>
            {this.isNominated(value.imdbID)?<button className={styles.disabledButton}>Nominate</button>:<button className={styles.button} onClick={()=>{this.nominateMovie(value)}}>Nominate</button>}
          </div>
        );
      });
    }else if(this.state.searchResultErrorMessage.length>0){
      searchResults = <p className={styles.regularText+" "+styles.middleText} >{this.state.searchResultErrorMessage}</p>
    }else{
      searchResults = <p className={styles.regularText+" "+styles.middleText}>Search for a movie title in the input above.</p>
    }



    let nominationsList;
    let shareMyList;
    if(this.state.nominationsList.length>0){
      shareMyList = "https://marque2.github.io/shopify_ux_challenge?nomi=";
      nominationsList = this.state.nominationsList.map((value, key)=>{
        shareMyList+=value.imdbID+"$$";
        return (
            <div key={key} style={{backgroundImage:"url('"+value.Poster+"')"}} className={styles.nominationCardPoster}>
              <div onClick={()=>{this.unNominateMovie(value)}} className={styles.removeNominationButton}>
                <img alt="" src={trashIcon} />
              </div>
              <p className={styles.regularText}>{value.Title} ({value.Year})</p>
            </div>
        );
      });
      shareMyList = shareMyList.substring(0, shareMyList.length-2);
    }else{
      nominationsList = <p className={styles.regularText}>Nominate up to 5 of your favorite movies.</p>
    }



    let shareLinkPopup;
    if(this.state.shareLinkIsActive){
      shareLinkPopup = (
        <div ref={this.shareLinkContainerRef} onClick={this.handleShareLinkModalClick} id={styles.shareLinkContainer}>
          <div className={styles.modal}>
            <img alt="" ref={this.closeModalButtonRef} src={xIcon} className={styles.closeButton} />
            <p className={styles.blackTitle2}>Share your nominations list</p>
            <div id={styles.shareLinkInputDiv} >
              <img alt="" src={copyIcon} onClick={this.copyLink} />
              <input ref={this.shareLinkInputRef} readOnly type="text" value={shareMyList}></input>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
      {this.state.nominationsList.length===5?<div id={styles.topBanner}><p className={styles.regularText}>Your nomination list is full! (5 movies max.)</p></div>:null}
        <div id={styles.contentBody}>
          <p className={styles.title1}>The Shoppies Awards</p>
          <img alt="" className={styles.desktopDisplayOnly} onClick={this.showShareLinkModal} id={styles.shareIcon} src={shareIcon}/>
          <div ref={this.inputDivRef} id={styles.inputDiv}>
            <img alt="" src={searchIcon} />
            <input id={styles.searchInput} ref={this.inputRef} onChange={this.handleInputChange} type="text" name="titleSearchInput" value={this.state.titleSearchInput} placeholder="movie title"></input>
          </div>
          <img alt="" className={styles.mobileDisplayOnly} onClick={this.showShareLinkModal} id={styles.shareIcon} src={shareIcon}/>

          <div id={styles.searchResultsMainContainer}>
            {searchResults}
          </div>
          <div id={styles.nominationsMainContainer}>
            <p className={styles.title2}>Nominations</p>
            {nominationsList}
          </div>
        </div>
        {shareLinkPopup}
        <SnackBar ref={this.snackBarRef} />
        <p className={styles.regularText}>Made by Marc-André Meza</p>
      </div>
    );
  }
}

export default App;
