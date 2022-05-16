import React, { useEffect, useState } from 'react'
import usersList from '../utils/userList.json';
import MemberList from './MemberList.js';

const Members = () => {

  const [dropData, setDropData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortByData, setSortByData] = useState(1);

  useEffect(() => {
    let status = [];
    usersList.map(item => {
      status.push(item.status)
    });
    let uniqueStatus = status.filter((e, i) => status.indexOf(e) === i);
    uniqueStatus.unshift('all');
    setDropData(uniqueStatus);


    let data = []
    usersList.map(item => {
      let age = getAge(item.dateOfBirth);
      if (age > 18) {
        data.push(item)
      }
    })

    let filterData;
    if(sortByData == 1){
    filterData = ascendingOrder(data);
    } else if(sortByData == 2){
      filterData = descendingOrder(data);
    }

    setFilteredData(filterData)
  }, [])

  const selectChange = (value) => {
    let pushedData = [];
    if (value == 'all') {
      usersList.map(item => {
        let age = getAge(item.dateOfBirth);
        if (age > 18) {
          pushedData.push(item)
        }
      })
    } else {
      let filterData = usersList.filter(item => item.status === value);
      filterData.map(item => {
        let age = getAge(item.dateOfBirth);
        if (age > 18) {
          pushedData.push(item)
        }
      })
    }

    let sortedFilteredData;
    if(sortByData == 1){
      sortedFilteredData = ascendingOrder(pushedData);
      } else if(sortByData == 2){
        sortedFilteredData = descendingOrder(pushedData);
      }
    setFilteredData(sortedFilteredData);
  }

  const ascendingOrder = (data) => {
    let ascData = data.sort(function (a, b) {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
      return 0;
    })

    return ascData
  }

  const descendingOrder = (data) => {
    let descData = data.sort(function (a, b) {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return 1;
      return 0;
    })
    return descData
  }

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const sortBy = (value) => {
    let data = []
    setSortByData(value)
    if (value == 1) {
      data = ascendingOrder(filteredData)
    } else if (value == 2) {
      data = descendingOrder(filteredData)
    }
    setFilteredData([...data]);
  }


  return (
    <div style={{ backgroundColor: '#0077D3', minHeight: '100vh' }}>
      <h4 style={{ color: 'white', textAlign: 'center', paddingTop: '20px' }}>Members List</h4>
      <div className='d-flex justify-content-center flex-column align-items-center' >
        <div className='d-flex filter' style={{ marginTop: '50px' }}>
          <div style={{ marginRight: '20px' }}>
            <label style={{ color: 'white' }}>Status</label>
            <select className="form-select" onChange={(e) => { selectChange(e.target.value) }}>
              {
                dropData.map(item => (
                  <option value={item} key={item}>{item == 'active' ? 'Online' : item == 'inactive' ? 'Offline' : item == 'all' ? 'All' : 'Away'}</option>
                ))
              }
            </select>
          </div>

          <div className='d-flex flex-column order-by'>
            <label style={{ color: 'white' }}>Order by</label>
            <select className="form-select"  onChange={(e) => { sortBy(e.target.value)}}>
              <option value="1">A-Z</option>
              <option value="2">Z-A</option>
            </select>
          </div>
        </div>

        <MemberList data={filteredData} />
      </div>
    </div>
  )
}

export default Members