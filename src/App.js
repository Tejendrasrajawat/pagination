import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0)
  const [num, setNum] = useState(1);
  
 useEffect(() => {
  const getData = async() => {
    const res = await axios.get(`https://reqres.in/api/users?page=${num}`)
    const dataLoad = res.data.data;
    setPageCount(res.data.total_pages);
    setData(dataLoad.map(pd => 
        <tr key={pd.id}>
        <td>{pd.id}</td>
        <td>{pd.email}</td>
        <td>{pd.first_name}</td>
        <td>{pd.last_name}</td>
        <td><img src={pd.avatar} alt=""/></td>
        </tr>
        ));                
}
getData();
},[num])

var handlePageClick = (e) => {
  setNum(e.selected +1);
};

return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>



       <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
  );
}

export default App;