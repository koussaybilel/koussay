import React, { Component } from "react";
import CandidatDataService from "../services/candidat.service";
export default class AddFeaturedJob extends Component {
    constructor(props) {
      super(props);
      this.onChangeRef = this.onChangeRef.bind(this);
      this.onChangeFjobTitle = this.onChangeFjobTitle.bind(this);
      this.onChangeCountry=this.onChangeCountry.bind(this);
      this.onChangeFjobDescription=this.onChangeFjobDescription.bind(this);
      this.onChangeFjobDuration=this.onChangeFjobDuration.bind(this);
      this.onChangeQualities=this.onChangeQualities.bind(this);
       
  
      this.saveFJob = this.saveFJob.bind(this);
      this.newFJob = this.newFJob.bind(this);

      this.state = {
        id: null,
        ref: "",
        fjobtitle: "",
        country:"",
        fjobdescription:"",
        fjobduration:"",
        qualities:"",

        submitted:false 
        
      }
    }
  
    onChangeRef(e) {
        this.setState({
          ref:e.target.value
          
        });
        }
    onChangeFjobTitle(e) {
        this.setState({
          fjobtitle:e.target.value
              
        });
        }
    onChangeCountry(e) {
        this.setState({
           country:e.target.value
        });
        }

    onChangeFjobDescription(e) {
        this.setState({
          fjobdescription:e.target.value
            
        });
        }
          
    onChangeFjobDuration(e) {
        this.setState({
          fjobduration:e.target.value
              
        });
        }
    onChangeQualities(e) {
        this.setState({
          qualities:e.target.value
                
        });
        }

        saveFJob() {
            var data = {
              ref:this.state.ref,
              fjobtitle: this.state.fjobtitle,
              country :this.state.country,
              fjobdescription:this.state.fjobdescription,
              fjobduration:this.state.fjobduration,
              qualities:this.state.qualities
                    };
        
            CandidatDataService.createF(data)
              .then(response => {
                this.setState({
                  id: response.data.id,
                  ref:this.state.ref,
                  fjobtitle: this.state.fjobtitle,
                  country :this.state.country,
                  fjobdescription:this.state.fjobdescription,
                  fjobduration:this.state.fjobduration,
                  qualities:this.state.qualities,
        
                  submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
          }
        
          newFJob() {
            this.setState({
              id: null,
              ref: "",
              fjobtitle: "",
              country:"",
              fjobdescription:"",
              fjobduration:"",
              qualities:"",
              submitted:false
            });
          }
        
          
  render() {
        return (
            <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4 >Featured Job submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newFJob}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <br/>
                <br/>
                <h1>Add A Featured Job !</h1>
                <br/>
                <br/>
            
            <label htmlFor="title"><h4 >Ref</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.ref}
                onChange={this.onChangeRef}
                name="ref"
              />
                  <br/>
            
            <label htmlFor="title"><h4 >Featured job Title</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.fjob}
                onChange={this.onChangeFjobTitle}
                name="FJobTitle"
              />
                  <br/>
            
            <label htmlFor="title"><h4 >Country</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.country}
                onChange={this.onChangeCountry}
                name="country"
              />
              <br/>
<label htmlFor="title"><h4 >Job description</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.fjobdescription}
                onChange={this.onChangeFjobDescription}
                name="FJobDescription"
              />
             <br/>
             <label htmlFor="title"><h4>Job duration</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.fjobduration}
                onChange={this.onChangeFjobDuration}
                name="FJobDuration"
              />
             <br/>
             <label htmlFor="title"><h4>Qualities needed</h4></label>
              <input
                type="text"
                className="form-control"
                id="dashForm"
                required
                value={this.state.qualities}
                onChange={this.onChangeQualities}
                name="Qualities"
              />
             <br/>
             <br/>
             <br/>

             <button onClick={this.saveFJob} className="submit" style={{marginBottom:"3%"}}> 
             Submit
            </button>
              
              </div>
    


        )}
     </div>   
        );
    }
    }