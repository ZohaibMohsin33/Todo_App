import {React,useState} from 'react'
import dayjs from 'dayjs'

export default function Index() {

    const [time,setTime] = useState("");

    setInterval(()=>{
      setTime(dayjs().format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]'))
    })

    const year = new Date().getFullYear()
  return (
    <footer className='container-fluid text-light bg-dark'>
        <div className="row">
            <div className="col text-center">&copy; All Rights Reserved | {year} {time}</div>
        </div>

    </footer>
  )
}
