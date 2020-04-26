import React, { Component } from "react";
import CandidatDataService from "../services/candidat.service";
import { Link } from "react-router-dom";

export default class CandidatList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchdiplome = this.onChangeSearchdiplome.bind(this);
    this.onChangeSearchexperience = this.onChangeSearchexperience.bind(this);
    this.onChangeSearchposte = this.onChangeSearchposte.bind(this);
    this.retrieveCandidat = this.retrieveCandidat.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCandidat = this.setActiveCandidat.bind(this);
    this.removeAllCandidat = this.removeAllCandidat.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.searchDiplome = this.searchDiplome.bind(this);
    this.searchExperience = this.searchExperience.bind(this);
    this.searchPoste = this.searchPoste.bind(this);
    
    this.state = {
      candidat: [],
      currentCandidat: null,
      currentIndex: -1,
      searchTitle: "",
      searchDiplome: "",
      searchExperience: "",
      searchPoste: "",
      trie:{
        p:"",
        ex:"",
        d:"",

 }
     
    };
   
  }

  componentDidMount() {
    this.retrieveCandidat();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value; 
    console.log(e.target.value.length);
    
    this.setState({
      searchTitle: searchTitle
    });
    
    if ( e.target.value.length===0)

    { 

    
      this.refreshList();

    }else {
    CandidatDataService.Search( e.target.value)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
      });}

  }



 
 

  deleteCandidat() {    
    CandidatDataService.delete(this.state.currentCandidat.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/candidat')
      })
      .catch(e => {
        console.log(e);
      });
  }


  retrieveCandidat() {
    CandidatDataService.getAll()
      .then(response => {
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCandidat();
    this.setState({
      currentCandidat: null,
      currentIndex: -1
    });
  }

  setActiveCandidat(candidat, index) {
    this.setState({
      currentCandidat: candidat,
      currentIndex: index,
     
     
    });
   
  }

  removeAllCandidat() {
    CandidatDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    if (this.state.searchTitle==="")
    {
      this.retrieveCandidat();

    }else {
    CandidatDataService.Search(this.state.searchTitle)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}
  }
/******************************recherche par diplome*********************************** */
 
  searchDiplome() {
    

    if (this.state.searchDiplome==="")
    {
      this.retrieveCandidat();

    }else {
    CandidatDataService.SearchD(this.state.searchDiplome)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}
  }
  onChangeSearchdiplome(e) {
    
   
    const searchDiplome = e.target.value; 
    console.log(e.target.value.length);
    
    this.setState({
      searchDiplome: searchDiplome  
      

    });
    
    var t = {p:this.state.searchPoste,d:e.target.value,ex:this.state.searchExperience}
    console.log(t)
    if ( e.target.value.length===0 &&this.state.searchPoste.length===0 && this.state.searchExperience.length===0 )

    { 

    
      this.refreshList();

    }else {
    CandidatDataService.sync(t)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
      });}

  }
  /******************************recherche par experience*********************************** */
  searchExperience() {
    if (this.state.searchExperience==="")
    {
      this.retrieveCandidat();

    }else {
    CandidatDataService.SearchE(this.state.searchExperience)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}
  }
  onChangeSearchexperience(e) {
    
    
    const searchExperience = e.target.value; 
    console.log(e.target.value);
    
    this.setState({
      searchExperience:searchExperience
    });
    var t = {p:this.state.searchPoste,d:this.state.searchDiplome,ex:e.target.value}
    console.log(t)
    if ( e.target.value.length===0 &&this.state.searchPoste.length===0 && this.state.searchDiplome.length===0 )

    { 

    
      this.refreshList();

    }else {
    CandidatDataService.sync(t)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
      });}

  }
   /******************************recherche par poste*********************************** */
   searchPoste() {
    if (this.state.searchPoste==="")
    {
      this.retrieveCandidat();

    }else {
    CandidatDataService.SearchP(this.state.searchPoste)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });}
  }
  onChangeSearchposte(e) {
   
    

    const searchPoste = e.target.value;

    console.log(e.target.value);
    
    this.setState({
      searchPoste:searchPoste
    });
    var t = {p:e.target.value,d:this.state.searchDiplome,ex:this.state.searchExperience}
    console.log(t)
    

    if ( e.target.value.length===0 && this.state.searchExperience.length ===0 && this.state.searchDiplome.length===0 )

    { 

    
      this.refreshList();

    }else {
    CandidatDataService.sync(t)
      .then(response => {
        
        this.setState({
          candidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
      });}

  }
/******************************trie*********************************** */
  trieparexperience =()=> {
  
var t = {p:this.state.searchPoste,d:this.state.searchDiplome,ex:this.state.searchExperience}


this.setState({
 trie:t
});


console.log(t)


CandidatDataService.trie(t)
.then(response => {
  
  this.setState({
    candidat: response.data
  });
  console.log(response.data);
})
.catch(e => {
  
});
  
  }
  triepardate =()=> {
  
    var t = {p:this.state.searchPoste,d:this.state.searchDiplome,ex:this.state.searchExperience}
    
    
    this.setState({
     trie:t
    });
    
    
    console.log(t)
    
    
    CandidatDataService.triedate(t)
    .then(response => {
      
      this.setState({
        candidat: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      
    });
      
      }




  render() {
    const { searchTitle,searchDiplome,searchPoste, searchExperience ,candidat, currentCandidat, currentIndex } = this.state;
   
    return (
      <div className="" >
                 
                  <div className="container">
                              <div className="col-md-6 center">
                              <div className="input-group mb-3">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder=" Global Search "
                                                  value={searchTitle}
                                                  onChange={this.onChangeSearchTitle}
                                                />
                                                            <div className="input-group-append">
                                                              <button
                                                                className="btn btn-outline-secondary"
                                                                type="button"
                                                                onClick={this.searchTitle}
                                                              >
                                                                Search
                                                              </button>
                                                            </div>
                                              </div>
                              </div>


                             
                              </div>


        
         

               <br></br>
               {/******************************tableau de recherche*********************************** */}
               <h1>search table by</h1>
               <table className="rwd-table">
               <thead></thead>
  <tbody>
  <tr>
    <td data-th="diplome"><input
                                                  type="text"
                                                 
                                                  placeholder="Search by diplome"
                                                  value={searchDiplome}
                                                  onChange={this.onChangeSearchdiplome}
                                                /> </td>
    <td data-th="experience"><input
                                                  type="text"
                                                 
                                                  placeholder="Search by experience"
                                                  value={searchExperience}
                                                  onChange={this.onChangeSearchexperience}
                                                /></td>

    <td data-th="POSTE"><input
                                                  type="text"
                                                 
                                                  placeholder="Search by poste"
                                                  value={searchPoste}
                                                  onChange={this.onChangeSearchposte}
                                                /></td>
        <td data-th="trie par"><button
                                                                className="btn btn-warning"
                                                                type="button"
                                                                onClick={this.trieparexperience}
                                                              >
                                                                experience
                                                              </button>

                                                              
                                                              <button
                                                                className="btn btn-warning m-3"
                                                                type="button"
                                                                onClick={this.triepardate}
                                                              >
                                                                date
                                                              </button>
                                                              </td>                                            
                                            
  </tr></tbody>
 
</table>
              
              {/******************************fin tableau de recherche *********************************** */}
                {/******************************tableau *********************************** */}
          
                <h1>table candidat</h1>
<div  className="container">

          <table  className="table">
          <thead className="thead-dark">
         

      
 
              <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>prenom</th>
          <th>tel</th>
          <th>Email</th>
          <th>Diplome</th>
          <th>experience</th>
          <th>POSTE</th>
          <th> Date de modification</th>
          <th> date de creaction</th>
          <th>action</th>
        
        </tr>
      </thead>
 


      <tbody >
        { (candidat.length > 0) ? candidat.map( (candidat,index) => {
           return (
            <tr    key={index}   >
              <td >
                
                <div className={"input-group-append"+(index === currentIndex ? "active" : "")}>
                 
              
               { candidat.id }
             
            </div>     
                
                
                
                
                </td>  
              <td>{ candidat.title}</td>
              <td>{ candidat.prenom}</td>
              <td>{ candidat.tel }</td>
              <td>{ candidat.email }</td>
              <td>{ candidat.diplome }</td>
              <td>{ candidat.experience }</td>
              <td>{ candidat.poste }</td>
              <td>{ candidat.modifyDate }</td>
              <td>{ candidat.createDate }</td>
              
                
              
              <td>
             
              <Link
            to={"/candidat/" + candidat.id}
            className="badge badge-warning"
          >
            Edit 
          </Link>
             
            
             


              </td>
            </tr>
          )
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
    
         
{/******************************fin tableau *********************************** */}


          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCandidat}
          >
            Remove All
          </button>
        </div>


        <div className="col-md-6">
          {currentCandidat ? (
            <div>
              <h4>Candidat</h4>
              <div>
                <label>
                  <strong>NOM:</strong>
                </label>{" "}
                {currentCandidat.title}
              </div>
              <div>
                <label>
                  <strong>tel:</strong>
                </label>{" "}
                {currentCandidat.tel}
              </div>
              <div>
                <label>
                  <strong>Poste:</strong>
                </label>{" "}
                {currentCandidat.poste}
              </div>
              <div>
                <label>
                  <strong>prenom:</strong>
                </label>{" "}
                {currentCandidat.prenom}
              </div>
              <div>
                <label>
                  <strong>email:</strong>
                </label>{" "}
                {currentCandidat.email}
              </div>
              <div>
                <label>
                  <strong>diplome:</strong>
                </label>{" "}
                {currentCandidat.diplome}
              </div>
              <div>
                <label>
                  <strong>experience:</strong>
                </label>{" "}
                {currentCandidat.experience}
              </div>
             
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCandidat.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/candidat/" + currentCandidat.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}