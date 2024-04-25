import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Weldings from "./pages/Weldings";
import AddWelding from "./pages/AddWelding";
import EditWelding from "./pages/EditWelding";
import Machines from "./pages/Machines";
import AddMachine from "./pages/AddMachine";
import EditMachine from "./pages/EditMachine";
import ShrinkSleeves from "./pages/ShrinkSleeves";
import AddShrinkSleeve from "./pages/AddShrinkSleeve";
import EditShrinkSleeve from "./pages/EditShrinkSleeve";
import Wires from "./pages/Wires";
import AddWire from "./pages/AddWire";
import EditWire from "./pages/EditWire";
import EditAccount from "./pages/EditAccount";
import { ToastContainer } from "react-toastify";
import RingTerminals from "./pages/RingTerminals";
import AddRingTerminal from "./pages/AddRingTerminal";
import EditRingTerminal from "./pages/EditRingTerminal";
import Combination from "./components/Combination";
import Glues from "./pages/Glues";
import AddGlue from "./pages/AddGlue";
import EditGlue from "./pages/EditGlue";
import ShrinkingCombination from "./components/ShrinkingCombination";
import WeldingCombination from "./components/WeldingCombination";
function App() {
  return (
    <div>
      {/* <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/weldings" element={<Weldings />} />
          <Route path="/weldings/add" element={<AddWelding />} />
          <Route path="/weldings/edit/:id" element={<EditWelding />} />
          <Route path="/ring-terminals" element={<RingTerminals />} />
          <Route path="/ringterminals/add" element={<AddRingTerminal />} />
          <Route path="/ringterminals/edit/:id" element={<EditRingTerminal />}/>
          <Route path="/shrinksleeves" element={<ShrinkSleeves />} />
          <Route path="/shrinksleeves/add" element={<AddShrinkSleeve />} />
          <Route
            path="/shrinksleeves/edit/:id"
            element={<EditShrinkSleeve />}
          />
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/add" element={<AddMachine />} />
          <Route path="/machines/edit/:id" element={<EditMachine />} />
          <Route path="/wires" element={<Wires />} />
          <Route path="/wires/add" element={<AddWire />} />
          <Route path="/wires/edit/:id" element={<EditWire />} />
          <Route path="/account" element={<EditAccount />} />
          <Route path="/combination" element={<Combination />} />
          <Route path="/glues" element={<Glues/>} />
          <Route path="/glues/add" element={<AddGlue/>} />
          <Route path="/glues/edit/:id" element={<EditGlue/>} />
          <Route path="/shrinking_combination" element={<ShrinkingCombination />} />
          <Route path="/welding_combination" element={<WeldingCombination />} />
        



        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
