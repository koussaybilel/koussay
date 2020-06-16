import http from "../http-common";
import authHeader from './auth-header';
class CandidatDataService {
  getAll(x) {
    return http.get(`/candidatpage?page=${x}`, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/candidat/${id}`);
  }

  create(data) {
    return http.post("/candidat", data);
  }

  update(id, data) {
    return http.put(`/candidat/${id}`, data,{ headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/candidat/${id}`);
  }

  deleteAll() {
    return http.delete(`/candidat`);
  }

  findByTitle(title) {
    
    return http.get(`/candidat?title=${title}`);
  }

  Search(x) {
    
    return http.get(`/candidat/Search/${x}`, { headers: authHeader() } );
  }
 
  SearchD(x) {
    
    return http.get(`/candidat/SearchD/${x}`);
  }

  SearchE(x) {
    
    return http.get(`/candidat/SearchE/${x}`);
  }
  SearchP(x) {
    
    return http.get(`/candidat/SearchP/${x}`);
  }

 trie(x) {
    
    return http.post("/candidat/tr",x,{ headers: authHeader() });
  }

  triedate(x) {
    
    return http.post("/candidat/trdate",x,{ headers: authHeader() });
  }


  sync(x) {
    
    return http.post("/candidat/sync",x, { headers: authHeader() });
  }



  /* ***************************ramzi *******************************************/
  getAllJ() {
    return http.get("/job");
  }

  getJ(id) {
    return http.get(`/job/${id}`);
  }
  createJ(data) {
    return http.post("/job", data);
  }
  updateJ(id, data) {
    return http.put(`/job/${id}`, data);
  }

  deleteJ(id) {
    return http.delete(`/job/${id}`);
  }

  deleteAllJ() {
    return http.delete(`/job`);
  }

  findByTitleJ(title) {
    return http.get(`/job?title=${title}`);
  }
  getAllG() {
    return http.get("/graduation");
  }

  getG(id) {
    return http.get(`/graduation/${id}`);
  }

  createG(data) {
    return http.post("/graduation", data);
  }

  updateG(id, data) {
    return http.put(`/graduation/${id}`, data);
  }

  deleteG(id) {
    return http.delete(`/graduation/${id}`);
  }

  deleteAllG() {
    return http.delete(`/graduation`);
  }

  findByTitleG(title) {
    return http.get(`/graduation?title=${title}`);
  }
  getAllF() {
    return http.get("/fjob");
  }

  getF(id) {
    return http.get(`/fjob/${id}`);
  }

  createF(data) {
    return http.post("/fjob", data,{ headers: authHeader() });
  }

  updateF(id, data) {
    return http.put(`/fjob/${id}`, data);
  }

  deleteF(id) {
    return http.delete(`/fjob/${id}`);
  }

  deleteAllF() {
    return http.delete(`/fjob`);
  }

  findByTitleF(title) {
    return http.get(`/fjob?title=${title}`);
  }

  download(file) {
    return http.get(`/download/${file}`);
  }


}

export default new CandidatDataService();