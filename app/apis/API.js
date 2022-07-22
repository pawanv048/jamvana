const API = async ({url, params, method, headers, onSuccess, onError}) => {
    let defaultHeaders = {
      'Content-Type': 'multipart/form-data',
    };
  
    //console.log('url: ' + url);
    await fetch(url, {
      method: method,
      headers: headers || defaultHeaders,
      body: params,
    })
      .then(response => response.json())
      .then(result => {
        //console.log(JSON.stringify(result));
        //console.log('abdcefgh');
        onSuccess(result);
      })
      .catch(err => {
        console.log(err);
        onError(err);
      });
  };
  
  export default API;