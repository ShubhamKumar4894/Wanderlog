import React, { useState, useContext } from "react";
import "./PlaceItem.css";
import Card from "../../shared/components/UIelements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
import { AuthContext } from "../../shared/context/Auth-context";
import { Modal } from "../../shared/components/UIelements/Modal";
import MapComponent from "../../shared/components/UIelements/Map";
import { useHttpClient } from "../hooks/Http-hook";

export const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(false);
  const { isLoadingState, error, sendRequest, clearError } = useHttpClient();
  const Auth = useContext(AuthContext);
  const showDeleteHandler = () => {
    setshowDeleteConfirmation(true);
  };
  const closeDeleteHandler = () => {
    setshowDeleteConfirmation(false);
  };
  const confirmDeleteHandler = async () => {
    setshowDeleteConfirmation(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/delete/${props.id}`,
        "DELETE",
        null,
        {Authorization: "Bearer " + Auth.token}
      );
      props.onDelete(props.id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <MapComponent center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteConfirmation}
        header="Are You Sure?"
        onCancel={closeDeleteHandler}
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={closeDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this place?</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoadingState && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`${import.meta.env.VITE_ASSET_URL}/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {Auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {Auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};
