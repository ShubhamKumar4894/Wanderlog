import { createBrowserRouter } from "react-router-dom";
import { App } from "../App.jsx";
import RootLayout from "../RootLayout.jsx";
import { UserPlaces } from "../Places/pages/UserPlaces.jsx";
import { NewPlace } from "../Places/pages/NewPlace.jsx";
import { UpdatePlaces } from "../Places/pages/UpdatePlaces.jsx";
import { ProtectedRoute,AuthOnlyRoute } from "./RoutesGuard.jsx";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <App /> },
        {
          element: <ProtectedRoute />,
          children: [
            // Remove leading slash to make relative
            { path: ":userId/places", element: <UserPlaces /> },
            { path: "places/new", element: <NewPlace /> },
            { path: "places/:placeId", element: <UpdatePlaces /> }
          ]
        },
        { path: "auth", element: <AuthOnlyRoute /> }
      ]
    }
  ])