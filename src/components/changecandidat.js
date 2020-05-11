import React, { Component } from "react";
import CandidatDataService from "../services/candidat.service";

export default class changeCandidature extends Component {
    constructor(props) {
      super(props);
this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
this.saveJob = this.saveJob.bind(this);
this.newJob = this.newJob.bind(this);
this.onChangeGraduationTitle = this.onChangeGraduationTitle.bind(this);
this.saveGraduation = this.saveGraduation.bind(this);
this.newGraduation = this.newGraduation.bind(this);


this.state = {
    id:null,
    jobTitle:"",
    submitted: false,
    graduationTitle:"",
    submitted1:false
};
}

onChangeJobTitle(e) {
  this.setState({
      jobTitle:e.target.value
  });
}

onChangeGraduationTitle(e) {
  this.setState({
    graduationTitle:e.target.value
  });
}

saveJob() {
    var data = {
      jobTitle:this.state.jobTitle,
    };

    CandidatDataService.createJ(data) 
    .then(response => {
        this.setState({
          

          id: response.data.id,
          jobTitle: response.data.jobTitle,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }

  newJob() {
    this.setState({
      id: null,
     jobTitle:"",
     submitted: false
    });
}

saveGraduation() {
  var data = {
    graduationTitle:this.state.graduationTitle,
  };

  CandidatDataService.createG(data) 
  .then(response => {
      this.setState({
        

        id: response.data.id,
        graduationTitle: response.data.graduationTitle,
        submitted1: true,
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

newGraduation() {
  this.setState({
    id: null,
   graduationTitle:"",
   submitted1: false
  });
}


render() {
    return (
  <div>
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4 style={{marginTop:"20%",marginLeft:"20%"}}>Job Added successfully!</h4>
            <button className="btn btn-success" onClick={this.newJob}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h1 style={{marginTop:"8%"}}>Ajouter un job</h1><br/>
            Job à ajouter:<br/>
            <input 
            type="text"
            id="dashForm"
            name="jobTitle"
            value={this.state.jobTitle}
            onChange={this.onChangeJobTitle}
            /><br/><br/>
            <button id="ajoutBtn" onClick={this.saveJob}>Submit</button>
          </div>)}
      </div>
      

      <div className="submit-form">
        {this.state.submitted1 ? (
          <div>
            <h4>Graduation Added successfully!</h4>
            <button className="btn btn-success" onClick={this.newGraduation}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h1>Ajouter un diplome</h1><br/>
            diplome à ajouter:<br/>
            <input 
            type="text"
            id="dashForm"
            name="graduationTitle"
            value={this.state.graduationTitle}
            onChange={this.onChangeGraduationTitle}
            /><br/><br/>
            <button id="ajoutBtn" onClick={this.saveGraduation}>Submit</button>
          </div>)}
      </div>
</div>


);
}
}