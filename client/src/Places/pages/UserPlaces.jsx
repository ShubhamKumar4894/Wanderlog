import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlaceLists } from "../components/PlaceLists";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
import { useHttpClient } from "../hooks/Http-hook";



export const UserPlaces =()=> {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  
  const userId = useParams().userId;

  useEffect(() => {
    if(!userId|| userId===undefined) {
      return;
    }
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}/places/user/${userId}`
        );
        console.log(responseData)
        setLoadedPlaces(responseData.place);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler=(deletedPlaceId)=>{
    setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place._id!==deletedPlaceId));
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoadingState && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoadingState && loadedPlaces &&<PlaceLists items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
    </>
  );
};
