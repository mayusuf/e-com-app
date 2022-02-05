const { useState } = require("react")

const useAuthentication = () => {
    const [isAuthorized,setIsAuthorized] = useState(false);
    return {isAuthorized,setIsAuthorized};
}

export default useAuthentication;