data ={
  mode:"local",
  localUrl:'http://localhost:3333',
  publicUrl:"http:\//51.178.16.150:3333"

}

class sURL{
  constructor(){
    url=""
    if(data.mode=="local"){
      url=data.localUrl;
    }

    else{
      url=data.publicUrl;
    }

    return url;

  }

}

function url(){
  url="";
  if(data.mode=="local"){
    url=data.localUrl;
  }

  else{
    url=data.publicUrl;
  }

  return url;
}

exports.url= data.publicUrl;
