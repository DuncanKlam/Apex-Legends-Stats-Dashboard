const APIQuerier = {
  
    fetchData ({username, platform}) {
        return fetch('https://api.mozambiquehe.re/bridge?' + new URLSearchParams({
          version: 5,
          platform: platform,
          player: username,
          auth: "optK8KAWv1umsikFyCqK"
        }))   
    }
}

export default APIQuerier