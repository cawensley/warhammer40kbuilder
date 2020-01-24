import React,{useEffect,useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import CodexFilter from "../../atoms/CodexFilter";
import AddtoDatabaseButton from "../../atoms/AddtoDatabaseButton";
import store from '../../Redux/store';

function ViewEquipmentPage () {
    const [isLoading, setisLoading] = useState(false);
    const [filteredEquipment,setFilteredEquipment]=useState([]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("equipment").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredEquipment(filterArray);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);


    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="View Equipment Page" />
            <CodexFilter/>
            <AddtoDatabaseButton redirect={"/equipment/new"} buttontext={"Add Equipment"}/>
            <div className="row justify-content-center ">
                <table className="table table-striped table-bordered text-white my-4 col-md-10 col-lg-6 bg-secondary">
                    <thead className="h5 text-warning">
                        <tr>
                            <td>Name</td>
                            <td>Cost</td>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredEquipment.map((item)=>(
                        <tr key={item.id}>
                            <td className="align-middle">{item.Name}</td>
                            <td className="align-middle">{item.Cost}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewEquipmentPage;