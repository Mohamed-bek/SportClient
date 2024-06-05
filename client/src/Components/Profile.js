import React,{useRef} from 'react'
import '../CSS/Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell,faUserPen,faLock ,faMoon , faLanguage ,faArrowRightFromBracket ,faUser} from '@fortawesome/free-solid-svg-icons'
import { useLocation, NavLink, Outlet } from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContxet'

function Profile(props) {
    const {user} = useUserContext()
    const dispatchUser = useUserContext().dispatchUser
    let FullName = user ? `${user.firstName} ${user.lastName}` : 'Unknown'
    const Links =[
    {id : 0 ,to : '' ,name : 'Profile' , icon : faUser},{id : 1 ,to : 'edit-profile' ,name : 'Edit Profile' ,icon : faUserPen},
    {id : 2 ,to : 'privacy' ,name : 'Privacy' ,icon :faLock},{id : 3 ,to : 'notification' ,name : 'Notification' ,icon : faBell},
    {id : 4 ,to : 'items' ,name : 'Items' ,icon : faMoon },{id : 5 ,to : '/' ,name : 'Language' , icon : faLanguage},
    ]
    const ListSettings = useRef();
    const locate = useLocation().pathname.split('/');
    const logOut = async () => {
        console.log('logOut')
        const res = await fetch('/log-out')
        console.log(res)
        if(res.ok){
            dispatchUser({type: 'LOGOUT'})
            window.location.assign('/')
        }
        if(!res.ok){
            console.log('error' , res)
        }
    }
return (
    <div className='Profile'>
        <div className='Box'>
            <div className='Head'>
                <div className='ImgCont'>
                    <img src={`http://localhost:4000/${user.profilePicture}`} alt=''/>
                </div>
                <div className='FullName'>
                    {FullName}
                </div>
            </div>
            <div className='ContDisplay'>
                <Outlet/>
            </div>
        </div>
        <nav>
            <ul ref={ListSettings}>
                {Links.map(link => (<li key={link.id}> <div className='Cont'>
                <NavLink to={link.to}  className={() => locate[locate.length - 1] ===  link.to ? "active" : 
                locate[locate.length - 1] === 'dashbord' && link.to === '' ? "active" : '' }>
                <FontAwesomeIcon className='icon' icon={link.icon}/>{link.name} </NavLink > <div></div>  </div>  </li>))}
                <li>
                    <div className='Cont'>
                        <a onClick={() => logOut()}>
                            <FontAwesomeIcon className='icon' icon={faArrowRightFromBracket}/>
                            Log Out
                        </a>
                        <div></div>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Profile