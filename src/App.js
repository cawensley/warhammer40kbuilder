import React, {useEffect, useState} from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import MainNavBar from './organisms/MainNavBar';
import Footer from './organisms/footer';
import HomePage from "./pages/HomePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import ViewArmiesPage from "./pages/Armies/ViewArmiesPage";
import ViewSquadsPage from "./pages/Squads/ViewSquadsPage";
import ViewUnitsPage from "./pages/Units/ViewUnitsPage";
import ViewEquipmentPage from "./pages/Equipment/ViewEquipmentPage";
import NewEquipmentPage from "./pages/Equipment/NewEquipmentPage";
import NewUnitsPage from "./pages/Units/NewUnitsPage";
import NewSquadsPage from "./pages/Squads/NewSquadsPage";
import NewArmiesPage from "./pages/Armies/NewArmiesPage";
import EditEquipmentPage from "./pages/Equipment/EditEquipmentPage";
import EditUnitsPage from "./pages/Units/EditUnitsPage";
import EditSquadsPage from "./pages/Squads/EditSquadsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FirebaseContext from "./firebase/FirebaseContext";
import firebase from "./firebase/firebase";
import PageLoading from "./atoms/PageLoading";

function App () {
    const [isLoading, setisLoading] = useState(false);
    const [codices,setCodices] = useState([]);
    const [codex,setCodex]=useState("75354kSpFNsaDqTqIT6i");
    const [roles,setRoles] = useState([]);
    const [role,setRole] = useState("g5ffh3LG3s8zZqUZKw9y");
    const [isLoggedIn,setisLoggedIn]=useState(false);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("codices").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setCodices(rawdata);
        });
        setisLoading(true);
        firebase.db.collection("Roles").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setRoles(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    if (isLoading) { return (<PageLoading />); }

    return (isLoggedIn) ? (
        <FirebaseContext.Provider value={{isLoggedIn,setisLoggedIn,codex,setCodex,codices,role,setRole,roles}}>
            <Router>
                <MainNavBar/>
                <Switch>
                    <Route path="/armies/view" component={ViewArmiesPage}/>
                    <Route path="/armies/new" component={NewArmiesPage}/>
                    <Route path="/squads/view" component={ViewSquadsPage}/>
                    <Route path="/squads/new" component={NewSquadsPage}/>
                    <Route path="/squads/edit/:ID" component={EditSquadsPage}/>
                    <Route path="/units/view" component={ViewUnitsPage}/>
                    <Route path="/units/new" component={NewUnitsPage}/>
                    <Route path="/units/edit/:ID" component={EditUnitsPage}/>
                    <Route path="/equipment/view" component={ViewEquipmentPage}/>
                    <Route path="/equipment/new" component={NewEquipmentPage}/>
                    <Route path="/equipment/edit/:ID" component={EditEquipmentPage}/>
                    <Route path="/userprofile" component={ViewProfilePage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
                <Footer/>
            </Router>
        </FirebaseContext.Provider>
    ) : (
        <FirebaseContext.Provider value={{isLoggedIn,setisLoggedIn}}>
            <Router>
                <MainNavBar/>
                <Switch>
                    <Route path="/auth/login" component={LoginPage}/>
                    <Route path="/auth/register" component={RegisterPage}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
                <Footer/>
            </Router>
        </FirebaseContext.Provider>
    )
}

export default App;