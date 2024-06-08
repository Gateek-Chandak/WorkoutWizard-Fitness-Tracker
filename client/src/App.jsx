import Home from "./HomePage/Home";
import LogIn from "./AuthPages/LogIn";
import SignUp from "./AuthPages/SignUp";
import UserLog from "./UserPages/Pages/UserLog";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext'
import { WorkoutSplitProvider } from "./Contexts/WorkoutSplitContext";
import { DraggedEventProvider } from "./Contexts/DraggedEventContext";
import { EventsProvider } from "./Contexts/EventsContext";

function App() {

  return (
    <Router>
      <AuthProvider>
        <WorkoutSplitProvider>
            <DraggedEventProvider>
              <EventsProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/log-in" element={<LogIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/user-log" element={<UserLog />} />
                </Routes>
              </EventsProvider>
            </DraggedEventProvider>
        </WorkoutSplitProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
