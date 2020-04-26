import React, { Component } from "react";
import CandidatDataService from "../services/candidat.service";

export default class Candidat extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangePoste = this.onChangePoste.bind(this);
    
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDiplome = this.onChangeDiplome.bind(this);
    this.onChangeExperience = this.onChangeExperience.bind(this);



    this.getCandidat = this.getCandidat.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCandidat = this.updateCandidat.bind(this);
    this.deleteCandidat = this.deleteCandidat.bind(this);

    this.state = {
      currentCandidat: {
        id: null,
      title: "",
      tel: "", 
      poste : "",
      prenom:"",
      email:"",
      diplome:"",
      experience:"",
     
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getCandidat(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCandidat: {
          ...prevState.currentCandidat,
          title: title
        }
      };
    });
  }

  onChangeTel(e) {
    const tel = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        tel:tel
      }
    }));
  }
  onChangePoste(e) {
    const poste = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        poste:poste
      }
    }));
  }
  onChangePrenom(e) {
    const prenom = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        prenom:prenom
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        email:email
      }
    }));
  }
  onChangeDiplome(e) {
    const diplome = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        diplome:diplome
      }
    }));
  }
  onChangeExperience(e) {
    const experience = e.target.value;
    
    this.setState(prevState => ({
      currentCandidat: {
        ...prevState.currentCandidat,
        experience:experience
      }
    }));
  }


  getCandidat(id) {
    CandidatDataService.get(id)
      .then(response => {
        this.setState({
          currentCandidat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCandidat.id,
      title: this.state.currentCandidat.title,
      tel: this.state.currentCandidat.tel,
      poste: this.state.currentCandidat.poste,
      prenom: this.state.currentCandidat.prenom,
      email: this.state.currentCandidat.email,
      diplome: this.state.currentCandidat.diplome,
      experience: this.state.currentCandidat.experience,

      published: status
    };

    CandidatDataService.update(this.state.currentCandidat.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCandidat: {
            ...prevState.currentCandidat,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCandidat() {
    CandidatDataService.update(
      this.state.currentCandidat.id,
      this.state.currentCandidat
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "candidat was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
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

  render() {
    const { currentCandidat } = this.state;

    return (
      <div>
        {currentCandidat ? (
          <div className="edit-form">
            <h4>Candidat</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">NOM</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCandidat.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">TEl</label>
                <input
                  type="text"
                  className="form-control"
                  id="tel"
                  value={currentCandidat.tel}
                  onChange={this.onChangeTel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="poste">POSTE</label>
                <input
                  type="text"
                  className="form-control"
                  id="poste"
                  value={currentCandidat.poste}
                  onChange={this.onChangePoste}
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  value={currentCandidat.prenom}
                  onChange={this.onChangePrenom}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentCandidat.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="diplome">DIPLOME</label>
                <input
                  type="text"
                  className="form-control"
                  id="diplome"
                  value={currentCandidat.diplome}
                  onChange={this.onChangeDiplome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience">EXPERIENCE</label>
                <input
                  type="text"
                  className="form-control"
                  id="experience"
                  value={currentCandidat.experience}
                  onChange={this.onChangeExperience}
                />
              </div>
            

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCandidat.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCandidat.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCandidat}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCandidat}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a candidat...</p>
          </div>
        )}
      </div>
    );
  }
}