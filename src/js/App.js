function init()
{
    getUserAsync('yourUsernameHere')
    .then(data => console.log(data));
}

async function getUserAsync(name) {
    try{
      let response = await fetch(`https://api.github.com/users/${name}`);
      return await response.json();
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }