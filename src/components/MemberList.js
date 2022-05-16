import React from 'react'

const MemberList = (props) => {
  return (
    <div className='d-flex flex-wrap card-list' style={{width: '550px', marginTop: '50px'}}>
        {
            props.data.length > 0 ?
              props.data.map((item, i) => (
                <div className='card' key={item.id} style={{width: '250px', margin: '10px'}}>
                    <div className='card-body d-flex align-items-center justify-content-around'>
                        <span style={{height: '20px', width: '20px', borderRadius: '50%', backgroundColor: item.status === 'active' ? 'green' : item.status === 'inactive' ? 'red' : 'grey' }}></span>
                        <div className='d-flex flex-column'>
                          <span>{item.firstName}  {item.lastName}</span>
                          <span>{item.status === 'active' ? 'Online' : item.status === 'inactive' ? 'Offline' : 'Away'}</span>
                        </div>
                    </div>
                </div>
              ))
            : ''
          }
    </div>
  )
}

export default MemberList