 export default class FetchManager {

  constructor(url){

    this.url =  url;

    this.getJson= this.getJson.bind(this);
    this.getText= this.getText.bind(this);
    this.postJson= this.postJson.bind(this);
    this.postText= this.postText.bind(this);

  }

  async getJson(){
    return new Promise(

      (resolve, reject)=>{
        console.log(this);
        fetch(

          this.url,
          {
            method:"GET",
            'Content-Type': 'application/json'
          }

        )
        .then((response)=>response.json())
        .then((json)=>{resolve(json)})
        .catch(
          (error)=>{
            reject(error)
          }
        )
      }

    )
  }

  async getText(){
    return new Promise(

      (resolve, reject)=>{
        console.log(this);
        fetch(
          this.url,
          {
            method:"GET",
            'Content-Type': 'application/json'
          }
        )
        .then((response)=>response.text())
        .then((text)=>{resolve(text)})
        .catch(
          (error)=>{
            return error;
          }
        )
      }

    )
  }

  async postText(body){

    return new Promise(

      (resolve, reject)=>{
        console.log(this);
        fetch(
          this.url,
          {
            method:"POST",
            'Content-Type': 'application/json',
            body:JSON.stringify(body)
          }
        )
        .then((response)=>response.json())
        .then((json)=>{resolve(json)})
        .catch(
          (error)=>{
            return error;
          }
        )
      }

    )


  }

  async postJson(body,autentication=""){
    return new Promise(

      (resolve, reject)=>{
        console.log(`este es el body ${body}`)
        fetch(this.url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(body), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
            'Authorization':autentication
          }
        }).then(res => resolve(res.json()))
        .catch(error => reject('Error:', error))

      }

    )

  }


}
