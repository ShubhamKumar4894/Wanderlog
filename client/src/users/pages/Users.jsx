import React, { useEffect, useState } from "react";
import { UserLists } from "../components/UserLists";
import main_banner from "../../assets/main_banner_bg.png";
import { useHttpClient } from "../../Places/hooks/Http-hook";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
export const Users = () => {
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL+"/users/"
        );
        setLoadedUsers(responseData.users)
      } catch (error) {}
    };
    fetchUsers();
  },[sendRequest]);

  return <>
  <ErrorModal error={error} onClear={clearError}/>
  {isLoadingState&& (
    <div className="center">
      <LoadingSpinner/>
    </div>
  )}
  {!isLoadingState&& loadedUsers&&<UserLists items={loadedUsers} />}
  </>;
};
