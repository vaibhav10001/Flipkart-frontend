import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileLayout from "./ProfileLayout";
import ProfileOverview from "./ProfileOverview";
import ManageAddress from "./ManageAddress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<ProfileOverview />} />
          <Route path="manage-address" element={<ManageAddress />} />
        </Route>
      </Routes>
    </Router>
  );
}