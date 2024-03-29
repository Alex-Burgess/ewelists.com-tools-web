import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";

function App() {
  const history = useHistory();

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  // Page size
  useEffect( () => {
    function updateDimensions() {
      if (window.innerWidth < 400){
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/");
  }

  return (
    !isAuthenticating &&
    <div >
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, handleLogout, mobile }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
