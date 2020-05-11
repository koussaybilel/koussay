import React, { Component } from "react";
import CandidatDataService from "../services/candidat.service";
import { Link } from "react-router-dom";
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import logo from "../1.jpg"
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

      currentPage : 1,
      candidatPerPage : 5,

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
    this.retrieveCandidat(this.state.currentPage);
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



 
 


/**************************************partie pagination ********************************* */

  retrieveCandidat(currentPage)
{
  currentPage -= 1;
var x  = +currentPage+"&size="+this.state.candidatPerPage 

    CandidatDataService.getAll(x)
    .then(response => response.data)
    .then((data) => {this.setState({
      candidat: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      currentPage: data.number + 1
    });
    console.log(data)
  })
  .catch(e => {
    console.log(e);
  });
}


changePage = event => {
  let targetPage = parseInt(event.target.value);
  this.retrieveCandidat(targetPage);
  this.setState({
      [event.target.name]: targetPage
  });
};


firstPage = () => {
  let firstPage = 1;
  if(this.state.currentPage > firstPage) {
      this.retrieveCandidat(firstPage);
  }
};


prevPage = () => {
  let prevPage = 1;
  if(this.state.currentPage > prevPage) {
      this.retrieveCandidat(this.state.currentPage - prevPage);
  }
};


lastPage = () => {
  let condition = Math.ceil(this.state.totalElements / this.state.candidatPerPage);
  if(this.state.currentPage < condition) {
      this.retrieveCandidat(condition);
  }
};

nextPage = () => {
  if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.candidatPerPage)) {
      this.retrieveCandidat(this.state.currentPage + 1);
  }
};




/******************************************fin partie pagination ************************************************** */
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




      downloadcv(id) {
        CandidatDataService.download(id) 
      .then(response => {
        const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url=  window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();})
        
      })
    
      }
    




  render() {
    const { searchTitle,searchDiplome,searchPoste, searchExperience ,candidat, currentCandidat,  currentPage, totalPages } = this.state;
    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold"
  };



  
    return (
      <body>
      
                 
                 


        
         

               <br></br>
               {/******************************tableau de recherche*********************************** */}
              <div className="row">
              <div className="col-md-6">
               <table className="rwd-table">
               <thead> <FontAwesomeIcon icon={faList} /> serach by </thead>
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
 
</table></div>
<div className="col-md-6"><input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder=" Global Search "
                                                  value={searchTitle}
                                                  onChange={this.onChangeSearchTitle}
                                                /><button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={this.searchTitle}
                                              >
                                                Search
                                              </button></div>

</div>
              
              {/******************************fin tableau de recherche *********************************** */}

               {/******************************tableau *********************************** */}
               
                <Card className={"border border-dark bg-dark text-white"} style={{ width: '220%' }}>
                <Card.Header ><FontAwesomeIcon icon={faList} /> candidat List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
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
                                <th>filename</th>
                                <th>action</th>
                                </tr>
                                    </thead>
                              <tbody>
                                {  candidat.length === 0 ?
                                <tr align="center">
                                <td colSpan="11">No candidat Available.</td>
                              </tr> :
                               candidat.map((candidat) => (
                                <tr key={candidat.id}>
                                <td>
                                    <Image src={logo} roundedCircle width="25" height="25"/> {candidat.id}
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
                                  <td> <button  onClick={() => this.downloadcv(candidat.filename)} >{candidat.filename}</button> </td>
           <td>
                 <ButtonGroup>
                 <Link  to={"/candidat/" + candidat.id} className="btn btn-sm btn-warning"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                 <Button size="sm" variant="outline-danger"   ><FontAwesomeIcon icon={faTrash} />
                 
                 
                 
                 </Button>
                </ButtonGroup>
          </td>
          </tr>
          ))
                                }
                              </tbody>
                        </Table>
    </Card.Body>
    {candidat.length > 0 ?
    <Card.Footer>
    <div style={{"float":"left"}}>
        Showing Page {currentPage} of {totalPages}
    </div>
    <div style={{"float":"right"}}>
        <InputGroup size="sm">
            <InputGroup.Prepend>
                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}>
                    <FontAwesomeIcon icon={faFastBackward} /> First
                </Button>
                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}>
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                </Button>
            </InputGroup.Prepend>
            <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                onChange={this.changePage}/>
            <InputGroup.Append>
                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                    onClick={this.nextPage}>
                    <FontAwesomeIcon icon={faStepForward} /> Next
                </Button>
                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                    onClick={this.lastPage}>
                    <FontAwesomeIcon icon={faFastForward} /> Last
                </Button>
            </InputGroup.Append>
        </InputGroup>
    </div>
</Card.Footer> : null
}
</Card>


                    

             



               
  
         
{/******************************fin tableau *********************************** */}

              

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCandidat}
          >
            Remove All
          </button>
       


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
      
    
      </body>
    );
  }
 
}