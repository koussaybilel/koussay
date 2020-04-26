import http from "../http-common";

class CandidatDataService {
  getAll() {
    return http.get("/candidat");
  }

  get(id) {
    return http.get(`/candidat/${id}`);
  }

  create(data) {
    return http.post("/candidat", data);
  }

  update(id, data) {
    return http.put(`/candidat/${id}`, data);
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
    
    return http.get(`/candidat/Search/${x}`);
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
    
    return http.post("/candidat/tr",x);
  }

  triedate(x) {
    
    return http.post("/candidat/trdate",x);
  }


  sync(x) {
    
    return http.post("/candidat/sync",x);
  }

}

export default new CandidatDataService();